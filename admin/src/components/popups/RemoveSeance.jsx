import close from '../../i/close.png';

const RemoveSeance = ({isOpenRemoveSeance, isCloseRemoveSeance, filmTitle, onDelete}) => {
  if (!isOpenRemoveSeance) return null;

  const handleDelete = (e) => {
    e.preventDefault(); 
    onDelete(filmTitle.id);  
    isCloseRemoveSeance()
  };

  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Снятие с сеанса
              <a className="popup__dismiss" href="#" 
              onClick={(e) => {
                e.preventDefault();
                isCloseRemoveSeance()}
              }><img src={close} alt="Закрыть"/></a>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form action="delete_seance" onSubmit={handleDelete} acceptCharset="utf-8">
              <p className="conf-step__paragraph">Вы действительно хотите снять с сеанса фильм <span>"{filmTitle.film}"</span>?</p>
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Удалить" className="conf-step__button conf-step__button-accent"/>
                <button className="conf-step__button conf-step__button-regular" type="button" onClick={isCloseRemoveSeance}>Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveSeance;