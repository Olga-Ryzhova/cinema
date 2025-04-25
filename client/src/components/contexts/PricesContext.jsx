import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст для цен
const PricesContext = createContext();

// Провайдер для PricesContext
export const PricesProvider = ({children}) => {
  // Получаем все цены
  const [prices, setPrices] = useState([]);

  // Функция для получения всех залов с ценами
  const fetchPrices = async () => {
    const response = await fetch('http://localhost:3001/api/prices');
    if (!response.ok) {
      throw new Error('Error fetching prices');
    }
    const data = await response.json();
      
    setPrices(data); // Обновляем состояние залов
  };
    // Загружаем данные 
    useEffect(() => {
      fetchPrices();
    }, []);


  return (
    <PricesContext.Provider value={{ prices, fetchPrices }}>
      {children}
    </PricesContext.Provider>
  ); 
}

// Хук для использования контекста в других компонентах
export const usePrice = () => useContext(PricesContext);