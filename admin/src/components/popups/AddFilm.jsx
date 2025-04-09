import { useState } from 'react';
import close from '../../i/close.png';
import { useFilms } from '../contexts/FilmsContext';

const AddFilm = ({isOpenFilm, isCloseFilm, onAddFilm}) => {
  const [filmName, setFilmName] = useState('');
  const [filmDuration, setFilmDuration] = useState('');
  const [filmDescription, setFilmDescription] = useState('');
  const [filmCountry, setFilmCountry] = useState('');
  const { handleAddFilm} = useFilms();
  if (!isOpenFilm) return null; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (filmName && filmDuration &&  filmDescription && filmCountry) {
      const newFilm = {
        name: filmName,
        duration: filmDuration,
        description: filmDescription,
        country: filmCountry,
      };
      await handleAddFilm(newFilm); // Отправляем данные на сервер
      setFilmName(''); 
      setFilmDuration(''); 
      setFilmDescription(''); 
      setFilmCountry(''); 
      isCloseFilm(); 
    }
  }
  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Добавление фильма
              <a className="popup__dismiss" href="#" 
              onClick={(e) => {
                e.preventDefault();
                isCloseFilm()}}
                ><img src={close} alt="Закрыть"/></a>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form action="add_movie" onSubmit={handleSubmit} acceptCharset="utf-8">
              <div className="popup__container">
                <div className="popup__poster"></div>
                <div className="popup__form">
                  <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                    Название фильма
                    <input 
                    className="conf-step__input" 
                    type="text" 
                    value={filmName}
                    placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="name" 
                    required
                    onChange={(e) => setFilmName(e.target.value)}/>
                  </label>
                  <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                    Продолжительность фильма (мин.)
                    <input 
                    className="conf-step__input" 
                    type="text"  
                    name="duration" 
                    value={filmDuration}
                    required
                    onChange={(e) => setFilmDuration(e.target.value)}/>
                  </label>
                  <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                    Описание фильма
                    <textarea 
                      value={filmDescription} 
                      className="conf-step__input" 
                      type="text" 
                      name="description"  
                      required
                      onChange={(e) => setFilmDescription(e.target.value)}>
                      </textarea>
                  </label>
                  <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                    Страна
                    <input 
                    className="conf-step__input" 
                    value={filmCountry}  
                    type="text"  
                    name="duration" 
                    data-last-value="" 
                    required
                    onChange={(e) => setFilmCountry(e.target.value)}/>
                  </label>
                </div>
              </div>
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Добавить фильм" className="conf-step__button conf-step__button-accent" data-event="film_add"/>
                <input type="submit" value="Загрузить постер" className="conf-step__button conf-step__button-accent"/>
                <button className="conf-step__button conf-step__button-regular" type="button" onClick={isCloseFilm}>Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFilm;