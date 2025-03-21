import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст для залов
const HallsContext = createContext();

// Провайдер для HallsContext
export const HallsProvider = ({ children }) => {
  const [halls, setHalls] = useState([]);

  // Функция для получения всех залов с сервера
  const fetchHalls = async () => {
    const response = await fetch('http://localhost:3001/api/halls');
    if (!response.ok) {
      throw new Error('Error fetching halls');
    }
    const data = await response.json();
    setHalls(data); // Обновляем состояние залов
  };

  useEffect(() => {
    fetchHalls(); // Загружаем данные при монтировании
  }, []);

  // Функция для добавления нового зала
  const handleAddHall = async (newHall) => {
    const response = await fetch('http://localhost:3001/api/add_hall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newHall }),
    });

    if (!response.ok) {
      throw new Error('Error adding hall');
    }

    const data = await response.json();
    setHalls((prevHalls) => [...prevHalls, data]); // Добавляем новый зал в список
  };

  // Функция для удаления зала
  const handleDeleteHall = async (id) => {
    const response = await fetch(`http://localhost:3001/api/delete_hall/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      setHalls((prevHalls) => prevHalls.filter((hall) => hall.id !== id)); // Удаляем зал из списка
    }
  };

  return (
    <HallsContext.Provider value={{ halls, handleAddHall, handleDeleteHall }}>
      {children}
    </HallsContext.Provider>
  );
};

// Хук для использования контекста в других компонентах
export const useHalls = () => useContext(HallsContext);