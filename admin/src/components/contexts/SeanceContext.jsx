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

  // Добавляем новый сеанс
  const handleAddSeance= async (newSeance) => {
    const response = await fetch('http://localhost:3001/api/add_seance', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hall_id: newSeance.hall_id,
        film_id: newSeance.film_id,
        start_time: newSeance.start_time,
      }),
    });
   
    if (!response.ok) {
      throw new Error('Error adding seance');
    }
  
    const data = await response.json();
    setSeances(prevSeances => [...prevSeances, data]); // Добавляем новый фильм в список
  };

  
  // Удаляем фильм
  const handleDeleteSeanceClick = async (id) => {
    const response = await fetch(`http://localhost:3001/api/delete_seance/${id}`, {
      method: 'DELETE',
    });
  
    if (response.status === 204) {
      setSeances(prevSeances => prevSeances.filter(seance => seance.id !== id)); 
    } 
  };

  // установка цветов
  const getFilmColor = (index) => {
    const colors = [
      '#caff85', '#85ff89', '#85ffd3', '#85e2ff', 
      '#8599ff', '#ba85ff', '#ff85fb', '#ff85b1', '#ffa285'
    ];
    return colors[index % colors.length]; // Это для цикличности цветов
  }

  // Функция для преобразования времени в количество минут с начала дня
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const calculateSeanceStyle = (start_time, duration, index) => {
    const startMinutes = timeToMinutes(start_time);  
    const scaleFactor = 0.5; 
  
    const left = startMinutes * scaleFactor;  
    const width = duration * scaleFactor; 

    return { left: `${left}px`, width: `${width}px` };
  };
  
  return (
    <SeanceContext.Provider value={{ seances, handleAddSeance, handleDeleteSeanceClick, getFilmColor, calculateSeanceStyle}}>
      {children}
    </SeanceContext.Provider>
  ); 
}

// Хук для использования контекста в других компонентах
export const useSeance = () => useContext(SeanceContext);