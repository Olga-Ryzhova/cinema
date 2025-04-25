import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст для залов
const FilmsContext = createContext();

// Провайдер для FilmsContext

export const FilmsProvider = ({children}) => {
  // Получаем все фильмы
  const [films, setFilms] = useState([]);

  // Функция для получения всех фильмов с сервера
  const fetchFilms = async () => {
    const response = await fetch('http://localhost:3001/api/films');
    if (!response.ok) {
      throw new Error('Error fetching halls');
    }
    const data = await response.json();
    setFilms(data); // Обновляем состояние залов
  };

  // Загружаем данные фильмов
  useEffect(() => {
    fetchFilms();
  }, []);
  
  return (
    <FilmsContext.Provider value={{ films }}>
      {children}
    </FilmsContext.Provider>
  );
}

// Хук для использования контекста в других компонентах
export const useFilms = () => useContext(FilmsContext);