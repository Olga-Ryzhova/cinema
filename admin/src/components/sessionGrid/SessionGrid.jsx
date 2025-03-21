import { useState } from 'react';
import poster from '../../i/poster.png';
import AddFilm from "../popups/AddFilm";
import AddSeance from "../popups/AddSeance";
import RemoveFilm from "../popups/RemoveFilm";
import RemoveSeance from '../popups/RemoveSeance';
import { useHalls } from "../contexts/HallsContext";
import { useFilms } from '../contexts/FilmsContext';
import { useSeance } from '../contexts/SeanceContext';

const SessionGrid = () => {
  // Создание и удаление фильмов
  const [modalIsOpenFilm, setModalIsOpenFilm] = useState(false); 
  const [modalIsRemoveFilm, setModalIsRemoveFilm] = useState(false);
  const [filmToDelete, setFilmToDelete] = useState(null); 

  // Создание и удаление сеансов
  const [modalIsOpenSeance, setModalIsOpenSeance] = useState(false);
  const [modalIsRemoveSeance, setmodalIsRemoveSeance] = useState(false);
  const [modalSeance, setModalSeance] = useState(null);
  const [filmToDeleteSeance, setFilmToDeleteSeance] = useState(null); 

  // Получаем данные из контекста
  const { halls } = useHalls(); // Контекст для залов
  const { films, handleAddFilm, handleDeleteClick } = useFilms(); // Контекст для фильмов
  const { seances, handleAddSeance, handleDeleteSeanceClick, getFilmColor, calculateSeanceStyle } = useSeance(); // Контекст для сеанса


  // Открытие и закрытие модальных окон для фильма
  const openModalIsFilm = () => setModalIsOpenFilm(true);
  const closeModalIsFilm = () => setModalIsOpenFilm(false);

  // Открытие и закрытие модальных окон для сеанса
  const openModalIsSeance = (seance) => {
    setModalIsOpenSeance(true);
    setModalSeance(seance);
  }
  const closeModalIsSeance = () => setModalIsOpenSeance(false);

  // Открытие и закрытие модального окна для удаления фильма
  const openModalRemoveFilm = (film) => {
    setFilmToDelete(film);  // Устанавливаем выбранный фильм в состояние
    setModalIsRemoveFilm(true);  // Открываем модальное окно
  };
  const closeModalRemoveFilm = () => setModalIsRemoveFilm(false);  

  // Открытие и закрытие модального окна для удаления фильма с сеанса
  const openModalRemoveSeance = (filmTitle) => {
    setFilmToDeleteSeance(filmTitle);
    setmodalIsRemoveSeance(true);   
  };
  const closeModalRemoveSeance = () => setmodalIsRemoveSeance(false);  


  return (
    <section className="conf-step">
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={openModalIsFilm}>Добавить фильм</button>
          <AddFilm 
            isOpenFilm={modalIsOpenFilm} 
            isCloseFilm={closeModalIsFilm}
            onAddFilm={handleAddFilm} />
        </p>
        <ul className="conf-step__movies">
          {
            films.map((film, index) => {
              const color = getFilmColor(index);
              return (
                <li key={film.id} className="conf-step__movie" style={{ backgroundColor: color }}>
                  <img className="conf-step__movie-poster" alt="poster" src={poster}/>
                  <h3 className="conf-step__movie-title">{film.film}</h3>
                  <p className="conf-step__movie-duration">{film.duration} мин</p>
                
                  <button className="conf-step__button conf-step__button-trash" onClick={() => openModalRemoveFilm(film)}></button>
                  <RemoveFilm 
                    isOpenRemoveFilm={modalIsRemoveFilm}
                    isCloseRemoveFilm={closeModalRemoveFilm}
                    film={filmToDelete}  
                    onDelete={handleDeleteClick}
                  />
                </li>  
              )
            })
          }
        </ul>

        <div className="conf-step__seances">
          <button className="conf-step__button conf-step__button-accent" onClick={openModalIsSeance}>Добавить сеанс</button>
          <AddSeance 
                isOpenSeance={modalIsOpenSeance} 
                isCloseSeance={closeModalIsSeance}
                handleAddSeance={handleAddSeance} 
                modalSeance={modalSeance}/>
           <ul className="conf-step__seances-hall">
            {halls.map((hall) => {
              // Фильтруем сеансы по залу
              const hallSeances = seances.filter((seance) => seance.hall === hall.hall);

              return (
                <li key={hall.id}>
                  <h3 className="conf-step__seances-title">{hall.hall}</h3>
                  <div className="conf-step__seances-timeline">
                  {hallSeances.map((seance) => {
                  const film = films.find(f => f.film === seance.film);
                  const filmIndex = films.indexOf(film); // Находим индекс фильма
                  const color = getFilmColor(filmIndex); // Цвет фильма
                  const seanceStyle = calculateSeanceStyle(seance.start_time, seance.duration, filmIndex);
                      return (
                        <div
                          key={seance.id}
                          className="conf-step__seances-movie"
                          style={{ backgroundColor: color, ...seanceStyle }}>
                          <p className="conf-step__seances-movie-title">{seance.film}</p>
                          <p className="conf-step__seances-movie-start">{seance.start_time}</p>
                          <button className="conf-step__button conf-step__button-trash" onClick={() => openModalRemoveSeance(seance)}></button>
                          <RemoveSeance 
                            isOpenRemoveSeance={modalIsRemoveSeance}
                            isCloseRemoveSeance={closeModalRemoveSeance}
                            filmTitle={filmToDeleteSeance}  
                            onDelete={handleDeleteSeanceClick}
                          />
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
        </fieldset>  
      </div>
    </section>
  );
}

export default SessionGrid;
