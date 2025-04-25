import { useHalls } from "../contexts/HallsContext";
import { useEffect, useState } from 'react';
import { useHallsControl } from "../contexts/HallsControlContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const HallConfiguration = () => {
  const { halls } = useHalls(); 
  const { seats, handleAddSeate, fetchSeats } = useHallsControl();  

  const [selectedHall, setSelectedHall] = useState('');
  const [selectedRows, setRows] = useState('');
  const [selectedSeats, setSeats] = useState('');
  const [seatingArrangement, setSeatingArrangement] = useState([]); 
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (halls.length > 0) {
      const firstHallId = halls[0].id;
      setSelectedHall(firstHallId);
      initializeHallConfig(firstHallId);
    }
  }, [halls, seats]);

  const initializeHallConfig = (hallId) => {
    const hallConfig = seats.find(hall => hall.hall_id === parseInt(hallId));
    if (!hallConfig) return;

    const rows = +hallConfig.rows;
    const seatsCount = +hallConfig.seats;

    setRows(rows);
    setSeats(seatsCount);

    let baseSeating = [];

    try {
      if (typeof hallConfig.seating === 'string' && hallConfig.seating.trim().startsWith('[')) {
        baseSeating = JSON.parse(hallConfig.seating);
      } else if (Array.isArray(hallConfig.seating)) {
        baseSeating = hallConfig.seating;
      }
    } catch (e) {
      console.error(e);
    }

    const resizedSeating = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: seatsCount }, (_, seatIndex) =>
        baseSeating[rowIndex]?.[seatIndex] || 'standart'
      )
    );

    setSeatingArrangement(resizedSeating);
  };

  const handleHallChange = (e) => {
    const selectedHallId = e.target.value;
    setSelectedHall(selectedHallId);
    initializeHallConfig(selectedHallId);
  };

  const handleSubmit = async () => {
    if (selectedHall && selectedRows && selectedSeats) {
      const newSeats = {
        hall_id: selectedHall,
        rows: selectedRows,
        seats: selectedSeats,
        seatingString: JSON.stringify(seatingArrangement),
      };

      await handleAddSeate(newSeats);
      setSuccessMessage('Количество рядов и мест успешно добавлены');
      await fetchSeats();
      setSelectedHall('');
      setRows('');
      setSeats('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  };

  const handleChairClick = (rowIndex, seatIndex) => {
    const newSeatingArrangement = [...seatingArrangement];
    const currentChairType = newSeatingArrangement[rowIndex][seatIndex];

    if (currentChairType === 'standart') {
      newSeatingArrangement[rowIndex][seatIndex] = 'vip';
    } else if (currentChairType === 'vip') {
      newSeatingArrangement[rowIndex][seatIndex] = 'disabled';
    } else {
      newSeatingArrangement[rowIndex][seatIndex] = 'standart';
    }

    setSeatingArrangement(newSeatingArrangement);
  };

  const addRows = Array.from({ length: selectedRows }, (_, rowIndex) => {
    const addSeats = Array.from({ length: selectedSeats }, (_, seatIndex) => {
      const chairType = seatingArrangement[rowIndex]?.[seatIndex] || 'standart';

      return (
        <span
          key={seatIndex}
          className={`conf-step__chair conf-step__chair_${chairType}`}
          onClick={() => handleChairClick(rowIndex, seatIndex)}
        ></span>
      );
    });

    return (
      <div className="conf-step__row" key={rowIndex}>
        {addSeats}
      </div>
    );
  });

  return (
    <Formik
      initialValues={{
        rows: selectedRows,
        seats: selectedSeats,
        text: '',
      }}
      validationSchema={Yup.object({
        rows: Yup.number()
          .required('Введите количество рядов в числах')
          .min(1, 'Минимум 1 ряд'),
        seats: Yup.number()
          .required('Введите количество мест в числах')
          .min(1, 'Минимум 1 место')
      })}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form action="add_seats">
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
                      onChange={handleHallChange}
                    />
                    <span className="conf-step__selector">{hall.hall}</span>
                  </li>
                ))}
              </ul>

              {selectedHall && (
                <>
                  <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
                  <div className="conf-step__legend" style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <label className="conf-step__label">
                      Рядов, шт
                      <Field
                        type="number"
                        className="conf-step__input"
                        placeholder="10"
                        name="rows"
                        onChange={(e) => {
                          setRows(e.target.value);
                          setFieldValue("rows", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" className="error" name="rows" />
                    </label>
                    <span className="multiplier" style={{ marginTop: '20px' }}>x</span>
                    <label className="conf-step__label">
                      Мест, шт
                      <Field
                        type="number"
                        className="conf-step__input"
                        placeholder="8"
                        name="seats"
                        onChange={(e) => {
                          setSeats(e.target.value);
                          setFieldValue("seats", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" className="error" name="seats" />
                    </label>
                  </div>

                  {successMessage && (
                    <div className="success-message" style={{ color: 'green', fontSize: '16px' }}>
                      {successMessage}
                    </div>
                  )}

                  <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
                  <div className="conf-step__legend">
                    <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                    <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                    <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
                    <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
                  </div>

                  <div className="conf-step__hall">
                    <div className="conf-step__hall-wrapper">
                      {addRows}
                    </div>
                  </div>
                </>
              )}

              <fieldset className="conf-step__buttons text-center">
                <button
                  type="button"
                  className="conf-step__button conf-step__button-regular"
                  onClick={() => {
                    setSeatingArrangement(
                      Array.from({ length: +values.rows || 0 }, () =>
                        Array.from({ length: +values.seats || 0 }, () => 'standart')
                      )
                    );
                  }}
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

export default HallConfiguration;
