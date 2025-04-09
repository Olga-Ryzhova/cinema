import { useHalls } from "../contexts/HallsContext";
import { useState } from 'react';
import { useHallsControl } from "../contexts/HallsControlContext";

const HallConfiguration = () => {
  const { halls } = useHalls(); // Контекст залов
  const { seats, handleAddSeate } = useHallsControl();  // Контекст управления залами

  const [selectedHall, setSelectedHall] = useState('');
  const [selectedRows, setRows] = useState();
  const [selectedSeats, setSeats] = useState();
  const [seatingArrangement, setSeatingArrangement] = useState([]); //  для хранения названий кресел

  // Обработчик выбора зала
  const handleHallChange = (e) => {
    const selectedHallId = e.target.value;
    setSelectedHall(selectedHallId);

    const hallConfig = seats.find(hall => hall.hall_id === parseInt(selectedHallId));

    if (hallConfig) {
      setRows(hallConfig.rows);
      setSeats(hallConfig.seats);
      const initialSeating = Array(hallConfig.rows).fill().map(() => Array(hallConfig.seats).fill('standart')); // инициализируем каждый кресло как 'standart'
      setSeatingArrangement(initialSeating);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    console.log('Информация о местах по рядам:', seatingArrangement);

    if (selectedHall && selectedRows && selectedSeats) {
      const newSeats = {
        hall_id: selectedHall,
        rows: selectedRows,
        seats: selectedSeats
      };
      console.log('Места, которые будут отправлены:', newSeats);
      // Вызываем функцию добавления цены
      await handleAddSeate(newSeats);
      setSelectedHall('');
      setRows('');
      setSeats('');
    }
  };

  // Обработчик изменения типа кресла
  const handleChairClick = (rowIndex, seatIndex) => {
    const newSeatingArrangement = [...seatingArrangement];

    // Меняем тип кресла по клику
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
      const chairType = seatingArrangement[rowIndex] && seatingArrangement[rowIndex][seatIndex] || 'standart'; 

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
    <form action="add_seats" onSubmit={handleSubmit} acceptCharset="utf-8">
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
                );
              })
            }
          </ul>

          {selectedHall && (
            <>
              <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
              <div className="conf-step__legend">
                <label className="conf-step__label">
                  Рядов, шт
                  <input 
                    type="text" 
                    className="conf-step__input" 
                    placeholder="10" 
                    value={selectedRows}
                    onChange={(e) => setRows(e.target.value)} />
                </label>
                <span className="multiplier">x</span>
                <label className="conf-step__label">
                  Мест, шт
                  <input 
                    type="text" 
                    className="conf-step__input" 
                    placeholder="8" 
                    value={selectedSeats}
                    onChange={(e) => setSeats(e.target.value)} />
                </label>
              </div>
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
            <button className="conf-step__button conf-step__button-regular">Отмена</button>
            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
          </fieldset>                 
        </div>
      </section>
    </form>
  );
}

export default HallConfiguration;