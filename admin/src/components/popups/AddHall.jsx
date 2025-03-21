import close from '../../i/close.png';
import { useState } from 'react';

const AddHall = ({isOpenHall, isCLoseHall, onAddHall }) => {
	const [hallName, setHallName] = useState('');

  if (!isOpenHall) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hallName) {
      await onAddHall(hallName); // Отправляем данные на сервер
      setHallName(''); // Очищаем поле
      isCLoseHall(); // Закрываем модальное окно
    }
  }

  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Добавление зала
              <a className="popup__dismiss" href="#" 
              onClick={(e) => {
                e.preventDefault();
                isCLoseHall()}
              }
              ><img src={close} alt="Закрыть"/></a>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form onSubmit={handleSubmit} acceptCharset="utf-8">
              <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                Название зала
                <input 
                  className="conf-step__input" 
                  type="text" 
                  placeholder="Например, &laquo;Зал 1&raquo;" 
                  value={hallName}
                  onChange={(e) => setHallName(e.target.value)}
                  required/>
              </label>
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Добавить зал" className="conf-step__button conf-step__button-accent" data-event="hall_add"/>
                <button className="conf-step__button conf-step__button-regular" type="button" onClick={isCLoseHall}>Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddHall;