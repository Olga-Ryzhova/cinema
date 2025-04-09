import { useHalls } from "../contexts/HallsContext";
import { useState } from 'react';
import { usePrice } from "../contexts/PricesContext";

const PriceConfigurations = () => {
  const { halls } = useHalls(); // Контекст залов
  const { handleAddPrice } = usePrice(); // Контекст цен

  const [selectedHall, setSelectedHall] = useState('');
  const [selectedUsualArmchair, setSelectedUsualArmchair] = useState('');
  const [selectedVipArmchair, setSelectedVipArmchair] = useState('');

  // Обработчик выбора зала
  const handleHallChange = (e) => {
    setSelectedHall(e.target.value);
    // Сбросить цены при смене зала
    setSelectedUsualArmchair('');
    setSelectedVipArmchair('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (selectedHall && selectedUsualArmchair && selectedVipArmchair) {
      const newPrice = {
        hall_id: selectedHall,
        usual_armchair: selectedUsualArmchair,
        vip_armchair: selectedVipArmchair
      };

      // Вызываем функцию добавления цены
      await handleAddPrice(newPrice);
      setSelectedHall('');
      setSelectedUsualArmchair('');
      setSelectedVipArmchair('');
    }
  };

  return (
    <form action="add_price"  onSubmit={handleSubmit}  acceptCharset="utf-8">
      <section className="conf-step">
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <ul className="conf-step__selectors-box">
            {
              halls.map(hall => {
                return (
                  <li key={hall.id}>
                    <input 
                      type="radio" 
                      className="conf-step__radio" 
                      name="prices-hall" 
                      value={hall.id} 
                      checked={+selectedHall === hall.id}
                      onChange={handleHallChange} 
                    />
                    <span className="conf-step__selector"> {hall.hall}</span>
                  </li>
                )
              })
            }
          </ul>
  
          {selectedHall && (
            <>
              <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
              <div className="conf-step__legend">
                <label className="conf-step__label">
                  Цена, рублей
                  <input 
                    type="number" 
                    className="conf-step__input" 
                    placeholder="0" 
                    value={selectedUsualArmchair}
                    onChange={(e) => setSelectedUsualArmchair(e.target.value)}
                  />
                </label>
                за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
              </div>  
  
              <div className="conf-step__legend">
                <label className="conf-step__label">
                  Цена, рублей
                  <input 
                    type="number" 
                    className="conf-step__input" 
                    placeholder="0" 
                    value={selectedVipArmchair}
                    onChange={(e) => setSelectedVipArmchair(e.target.value)}
                  />
                </label>
                за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
              </div>  
            </>
          )}
  
          <fieldset className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular">Отмена</button>
             <input 
              type="submit" 
              value="Сохранить" 
              className="conf-step__button conf-step__button-accent" 
            />
          </fieldset>  
        </div>
      </section>
    </form>
  );
  
}

export default PriceConfigurations;
