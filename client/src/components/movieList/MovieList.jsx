import { NavLink } from 'react-router-dom';
import { useHalls } from '../contexts/HallsContext';
import { useFilms } from '../contexts/FilmsContext';
import { useSeance } from '../contexts/SeanceContext';
import { useState } from 'react';

const MovieList = () => {
  const { halls } = useHalls(); 
  const { films } = useFilms();
  const { seances } = useSeance(); 

  const [selectedSeance, setSelectedSeance] = useState(null); 

  const handleSeanceClick = (film, hall, seance) => {
    setSelectedSeance({film, hall, seance});
  };

  return (
    <main>
      {films.map((film) => {
        // Фильтруем сеансы по текущему фильму
        const filmSeances = seances.filter((seance) => seance.film === film.film);
        
        return (
          <section className="movie" key={film.id}>
            <div className="movie__info">
              <div className="movie__poster">
                <img className="movie__poster-image" alt={film.film} src={`http://localhost:3001${film.poster}`} />
              </div>
              <div className="movie__description">
                <h2 className="movie__title">{film.film}</h2>
                <p className="movie__synopsis">{film.description}</p>
                <p className="movie__data">
                  <span className="movie__data-duration">{film.duration} мин </span>
                  <span className="movie__data-origin">- {film.country}</span>
                </p>
              </div>
            </div>

            <div className="movie-seances__hall">
              {halls.map((hall) => {
                const hallSeances = filmSeances.filter((seance) => seance.hall === hall.hall);

                return (
                  <div key={hall.hall}>
                    <h3 className="movie-seances__hall-title">{hall.hall}</h3>
                    <ul className="movie-seances__list">
                      {hallSeances.map((seance) => (
                        <li key={seance.id} className="movie-seances__time-block">
                          <NavLink 
                            to={`/hall/${film.film}/${hall.hall}/${seance.start_time}`} 
                            className="movie-seances__time" 
                            onClick={() => handleSeanceClick(film, hall, seance)}>
                            {seance.start_time}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default MovieList;