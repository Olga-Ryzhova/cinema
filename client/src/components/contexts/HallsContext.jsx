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

 

  return (
    <HallsContext.Provider value={{ halls }}>
      {children}
    </HallsContext.Provider>
  );
};

// Хук для использования контекста в других компонентах
export const useHalls = () => useContext(HallsContext);