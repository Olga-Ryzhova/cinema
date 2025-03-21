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
  
  // Добавляем новый фильм
  const handleAddFilm = async (newFilm) => {
    const response = await fetch('http://localhost:3001/api/add_movie', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newFilm.name,         
        duration: newFilm.duration, 
        description: newFilm.description, 
        country: newFilm.country,   
      }),
    });
  
    if (!response.ok) {
      throw new Error('Error adding film');
    }
  
    const data = await response.json();
    setFilms(prevFilms => [...prevFilms, data]); // Добавляем новый фильм в список
  };
 
  // Удаляем фильм
  const handleDeleteClick = async (id) => {
    const response = await fetch(`http://localhost:3001/api/delete_film/${id}`, {
      method: 'DELETE',
    });
  
    if (response.status === 204) {
      setFilms(prevFilms => prevFilms.filter(film => film.id !== id)); // Удаляем фильм из prevFilms
    } 
  };

  return (
    <FilmsContext.Provider value={{ films, handleAddFilm, handleDeleteClick }}>
      {children}
    </FilmsContext.Provider>
  );
}

// Хук для использования контекста в других компонентах
export const useFilms = () => useContext(FilmsContext);