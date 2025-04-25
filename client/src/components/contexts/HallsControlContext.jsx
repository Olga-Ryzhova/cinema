import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст для управления залами
const HallsControlContext = createContext();

// Провайдер для HallsControlContext
export const HallsControlProvider = ({children}) => {
  // Получаем все места
  const [seats, setSeats] = useState([]);

  // Функция для получения всех залов с рядами и местами
  const fetchSeats = async () => {
    const response = await fetch('http://localhost:3001/api/seats');
    if (!response.ok) {
      throw new Error('Error fetching seats');
    }
    const data = await response.json();
    
    // Преобразуем строку обратно в массив
    data.forEach(hall => {
      if (hall.seating) {
        hall.seating = JSON.parse(hall.seating); 
      }
    });
  
    setSeats(data); // Обновляем состояние залов
  };
    // Загружаем данные 
    useEffect(() => {
      fetchSeats();
    }, []);
    
  return (
    <HallsControlContext.Provider value={{ seats, fetchSeats }}>
      {children}
    </HallsControlContext.Provider>
  ); 
}

// Хук для использования контекста в других компонентах
export const useHallsControl = () => useContext(HallsControlContext);