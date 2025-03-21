import { useState } from "react";
import { useHalls } from "../contexts/HallsContext";
import AddHall from "../popups/AddHall";
import RemoveHall from "../popups/RemoveHall";

const HallManagement = () => {
  // Создать зал
  const [modalIsOpenHall, setModalIsOpenHall] = useState(false);
  // Удалить зал
  const [modalIsRemoveHall, setModalIsRemoveHall] = useState(false);
  // Название зала, который нужно удалить
  const [hallToDelete, setHallToDelete] = useState(null);

  const { halls, handleAddHall, handleDeleteHall } = useHalls(); // Используем контекст

  const openModal = () => { setModalIsOpenHall(true); };
  const closeModal = () => { setModalIsOpenHall(false); };

  const openModalIsRemoveHall = (hall) => { 
    setHallToDelete(hall);
    setModalIsRemoveHall(true);
  };
  const closeModalIsRemoveHall = () => { setModalIsRemoveHall(false); };

  return (
    <section className="conf-step">
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        <ul className="conf-step__list">
          {
            halls.map((hall) => {
              return (
                <li key={hall.id}>
                  {hall.hall}
                  <button className="conf-step__button conf-step__button-trash" onClick={() => openModalIsRemoveHall(hall)}></button>
                  <RemoveHall 
                    hall={hallToDelete}
                    isOpenRemoveHall={modalIsRemoveHall} 
                    isCloseRemoveHall={closeModalIsRemoveHall} 
                    onDelete={handleDeleteHall}
                  />
                </li>
              );
            })
          }
        </ul>
        <button 
          className="conf-step__button conf-step__button-accent" 
          onClick={openModal}>Создать зал 
        </button>
        <AddHall 
          isOpenHall={modalIsOpenHall} 
          isCLoseHall={closeModal} 
          onAddHall={handleAddHall} 
        />
      </div>
    </section>
  );
};

export default HallManagement;