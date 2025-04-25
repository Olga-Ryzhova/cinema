import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст для сеанса
const SeanceContext = createContext();

// Провайдер для SeanceContext
export const SeanceProvider = ({children}) => {
  // Получаем все сеансы
  const [seances, setSeances] = useState([]);

  // Функция для получения всех сеансов с сервера
  const fetchSeance = async () => {
    const response = await fetch('http://localhost:3001/api/seances');
    if (!response.ok) {
      throw new Error('Error fetching seances');
    }
    const data = await response.json();
    setSeances(data); // Обновляем состояние залов
  };
  
  useEffect(() => {
    fetchSeance();
  }, []);

  
  
  return (
    <SeanceContext.Provider value={{ seances, fetchSeance}}>
      {children}
    </SeanceContext.Provider>
  ); 
}

// Хук для использования контекста в других компонентах
export const useSeance = () => useContext(SeanceContext);