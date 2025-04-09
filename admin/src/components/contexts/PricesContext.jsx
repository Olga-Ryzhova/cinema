import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст для цен
const PricesContext = createContext();

// Провайдер для PricesContext
export const PricesProvider = ({children}) => {
  // Получаем все цены
  const [prices, setPrices] = useState([]);

  // Добавляем новые цены
  const handleAddPrice = async (newPrice) => {
    const response = await fetch('http://localhost:3001/api/add_price', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hall_id: newPrice.hall_id,
        usual_armchair: newPrice.usual_armchair,
        vip_armchair: newPrice.vip_armchair,
      }),
    });
   
    if (!response.ok) {
      throw new Error('Error adding price');
    }
  
    const data = await response.json();
    setPrices(prevPrices => [...prevPrices, data]); // Добавляем новую цену 
  }

  return (
    <PricesContext.Provider value={{ prices, handleAddPrice }}>
      {children}
    </PricesContext.Provider>
  ); 
}

// Хук для использования контекста в других компонентах
export const usePrice = () => useContext(PricesContext);