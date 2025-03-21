import close from '../../i/close.png';

const RemoveFilm = ({isOpenRemoveFilm, isCloseRemoveFilm, film, onDelete}) => {
  if(!isOpenRemoveFilm)  return null; 
  
  const handleDelete = (e) => {
    e.preventDefault(); 
    onDelete(film.id);  
    isCloseRemoveFilm()
  };
  
  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Удаление фильма
              <a className="popup__dismiss" href="#" 
              onClick={(e) => {
                e.preventDefault();
                isCloseRemoveFilm()}
              }
              ><img src={close} alt="Закрыть"/></a>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form action="delete_film" onSubmit={handleDelete} acceptCharset="utf-8">
              <p className="conf-step__paragraph">Вы действительно хотите удалить фильм <span>"{film.film}"</span>?</p>
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Удалить" className="conf-step__button conf-step__button-accent"/>
                <button className="conf-step__button conf-step__button-regular" type="button" onClick={isCloseRemoveFilm}>Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveFilm;