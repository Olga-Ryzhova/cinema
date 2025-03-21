import { useState } from 'react';
import close from '../../i/close.png';

const RemoveHall = ({ isOpenRemoveHall, isCloseRemoveHall, hall, onDelete }) => {
  if (!isOpenRemoveHall) return null;

  const handleDelete = (e) => {
    e.preventDefault(); 
    onDelete(hall.id);  
    isCloseRemoveHall()
  };

  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Удаление зала
              <a className="popup__dismiss" href="#" 
               onClick={(e) => {
                e.preventDefault();
                isCloseRemoveHall()}
              }
              >
                <img src={close} alt="Закрыть" />
              </a>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form onSubmit={handleDelete} acceptCharset="utf-8">
              <p className="conf-step__paragraph">
                Вы действительно хотите удалить зал <span>"{hall.hall}"</span>?
              </p>
              <div className="conf-step__buttons text-center">
                <input
                  type="submit"
                  value="Удалить"
                  className="conf-step__button conf-step__button-accent"
                />
                <button
                  className="conf-step__button conf-step__button-regular"
                  type="button"
                  onClick={isCloseRemoveHall}
                >
                  Отменить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveHall;
