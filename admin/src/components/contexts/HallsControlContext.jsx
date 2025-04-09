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
      setSeats(data); // Обновляем состояние залов
    };
  
    // Загружаем данные 
    useEffect(() => {
      fetchSeats();
    }, []);
    

  // Добавляем места
  const handleAddSeate = async (newSeats) => {
    const response = await fetch('http://localhost:3001/api/add_seats', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hall_id: newSeats.hall_id,
        rows: newSeats.rows,
        seats: newSeats.seats,
      }),
    });
   
    if (!response.ok) {
      throw new Error('Error adding seats');
    }
  
    const data = await response.json();
    setSeats(prevSeats => [...prevSeats, data]); 
  }

  return (
    <HallsControlContext.Provider value={{ seats, handleAddSeate }}>
      {children}
    </HallsControlContext.Provider>
  ); 
}

// Хук для использования контекста в других компонентах
export const useHallsControl = () => useContext(HallsControlContext);