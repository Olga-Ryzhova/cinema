import close from '../../i/close.png';
import { useHalls } from '../contexts/HallsContext';
import { useFilms } from '../contexts/FilmsContext';
import { useEffect, useState } from 'react';
import { useSeance } from '../contexts/SeanceContext';

const AddSeance = ({isOpenSeance, isCloseSeance, modalSeance}) => {

  const { halls } = useHalls(); // Контект холла
  const { films } = useFilms(); // контекст фильмов
  const { handleAddSeance } = useSeance();  // контекст сеанса

  const [selectedHall, setSelectedHall] = useState('');
  const [selectedFilm, setSelectedFilm] = useState('');
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    if (halls.length > 0) {
      setSelectedHall(halls[0].id);
    }
    if (films.length > 0) {
      setSelectedFilm(films[0].id);
    }
  }, [halls, films]);

  if (!isOpenSeance) return null; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Форма отправлена'); 

    console.log('Данные для добавления сеанса:', {
      hall_id: selectedHall,
      film_id: selectedFilm,
      start_time: startTime
    });  

    if (selectedHall && selectedFilm && startTime) {
      const newSeance = {
        hall_id: selectedHall,
        film_id: selectedFilm,
        start_time: startTime
      };
      console.log('Сеанс, который будет отправлен:', newSeance);
      // Вызываем функцию добавления сеанса
      await handleAddSeance(newSeance);
      setSelectedHall('');
      setSelectedFilm('');
      setStartTime('');
      isCloseSeance(); // Закрываем модальное окно
    }
  };
    
  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Добавление сеанса
              <a className="popup__dismiss" href="#" 
              onClick={(e) => {
                e.preventDefault();
                isCloseSeance()}
              }
              ><img src={close} alt="Закрыть"/></a>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form  action="add_seance"  onSubmit={handleSubmit}  acceptCharset="utf-8">
              <label className="conf-step__label conf-step__label-fullsize" htmlFor="hall">
                Название зала
                <select
                  className="conf-step__input"
                  name="hall"
                  required
                  value={selectedHall}
                  onChange={(e) => setSelectedHall(e.target.value)}>
                  {halls.map((hall) => (
                    <option key={hall.id} value={hall.id}>
                      {hall.hall}
                    </option>
                  ))}
                </select>
              </label>
              <label className="conf-step__label conf-step__label-fullsize" htmlFor="film">
                Название фильма
                <select
                  className="conf-step__input"
                  name="film"
                  required
                  value={selectedFilm}
                  onChange={(e) => setSelectedFilm(e.target.value)}>
                  {films.map((film) => (
                    <option key={film.id} value={film.id}>
                      {film.film}
                    </option>
                  ))}
                </select>
              </label>
              <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                Время начала
                <input className="conf-step__input" type="time" name="start_time" required
                 value={startTime}
                 onChange={(e) => setStartTime(e.target.value)}/>
              </label>

              <div className="conf-step__buttons text-center">
                <input type="submit" value="Добавить" className="conf-step__button conf-step__button-accent" data-event="seance_add" />
                <button className="conf-step__button conf-step__button-regular" type="button" onClick={isCloseSeance}>Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSeance;