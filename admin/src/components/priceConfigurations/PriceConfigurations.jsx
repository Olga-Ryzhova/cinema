import { useHalls } from "../contexts/HallsContext";
import { useEffect, useState } from 'react';
import { usePrice } from "../contexts/PricesContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PriceConfigurations = () => {
  const { halls } = useHalls(); // Контекст залов
  const { prices, handleAddPrice } = usePrice(); // Контекст цен

  const [selectedHall, setSelectedHall] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (halls.length > 0) {
      const firstHallId = halls[0].id;
      setSelectedHall(firstHallId);
    }
  }, [halls]);

  const handleHallChange = (e, setFieldValue) => {
    const hallId = e.target.value;
    setSelectedHall(hallId);

    // Устанавливаем текущие цены для выбранного зала
    const hallPrices = prices.find(price => price.hall_id === +hallId);
    setFieldValue("usual", hallPrices?.usual_armchair || '');
    setFieldValue("vip", hallPrices?.vip_armchair || '');
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (selectedHall && values.usual && values.vip) {
      const newPrice = {
        hall_id: selectedHall,
        usual_armchair: values.usual,
        vip_armchair: values.vip
      };

      await handleAddPrice(newPrice);

      setSuccessMessage('Цены успешно добавлены');
      resetForm();

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  };

  return (
    <Formik
      initialValues={{ usual: '', vip: '' }}
      validationSchema={Yup.object({
        usual: Yup.number()
          .required('Введите стоимость в числах')
          .min(100, 'Минимум 100 рублей'),
        vip: Yup.number()
          .required('Введите стоимость в числах')
          .min(200, 'Минимум 200 рублей')
      })}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form action="add_price">
          <section className="conf-step">
            <div className="conf-step__wrapper">
              <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
              <ul className="conf-step__selectors-box">
                {halls.map(hall => (
                  <li key={hall.id}>
                    <input
                      type="radio"
                      className="conf-step__radio"
                      name="prices-hall"
                      value={hall.id}
                      checked={+selectedHall === hall.id}
                      onChange={(e) => handleHallChange(e, setFieldValue)}
                    />
                    <span className="conf-step__selector">{hall.hall}</span>
                  </li>
                ))}
              </ul>

              {selectedHall && (
                <>
                  <p className="conf-step__paragraph">Установите цены для типов кресел:</p>

                  <div className="conf-step__legend">
                    <label className="conf-step__label">
                      Цена, рублей
                      <Field
                        type="number"
                        className="conf-step__input"
                        placeholder="0"
                        name="usual"
                      />
                    </label>
                    за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
                    <ErrorMessage component="div" className="error" name="usual" style={{ width: '100%' }} />
                  </div>

                  <div className="conf-step__legend">
                    <label className="conf-step__label">
                      Цена, рублей
                      <Field
                        type="number"
                        className="conf-step__input"
                        placeholder="0"
                        name="vip"
                      />
                    </label>
                    за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
                    <ErrorMessage component="div" className="error" name="vip" style={{ width: '100%' }} />
                  </div>
                </>
              )}

              {successMessage && (
                <div className="success-message" style={{ color: 'green', fontSize: '16px' }}>
                  {successMessage}
                </div>
              )}

              <fieldset className="conf-step__buttons text-center">
                <button
                  type="button"
                  className="conf-step__button conf-step__button-regular" 
                >
                  Отмена
                </button>
                <input
                  type="submit"
                  value="Сохранить"
                  className="conf-step__button conf-step__button-accent"
                />
              </fieldset>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default PriceConfigurations;

