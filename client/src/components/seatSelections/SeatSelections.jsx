import { useParams } from 'react-router-dom';
import { useHallsControl } from '../contexts/HallsControlContext';
import { Link } from 'react-router-dom';
import { usePrice } from '../contexts/PricesContext';
import { useState } from 'react';

const SeatSelections = () => {
  const { seats } = useHallsControl(); 
  const { prices } = usePrice();
  const { film, hallName, seance } = useParams(); 
  const [seatingArrangement, setSeatingArrangement] = useState([]); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeance, setSelectedSeance] = useState(null); 
  
  const selectedHall = seats.find((hall) => hall.hall_id === parseInt(hallName.replace('Зал ', '')));

  const seating = selectedHall.seating;  
  const rows = selectedHall.rows; 
  const seatsInRow = selectedHall.seats; 

  // Находим цену для выбранного зала
  const selectedPrice = prices.find((price) => price.id === selectedHall.hall_id);
  
  const usualPrice = selectedPrice ? selectedPrice.usual_armchair : 250; 
  const vipPrice = selectedPrice ? selectedPrice.vip_armchair : 350;

  const handleChairClick = (rowIndex, seatIndex) => {
    const row = rowIndex + 1;
    const seat = seatIndex + 1;
  
    const isAlreadySelected = selectedSeats.some(
      s => s.row === row && s.seat === seat
    );
    if (isAlreadySelected) return;
  
    const newSeatingArrangement = [...seating];
    const currentChairType = newSeatingArrangement[rowIndex][seatIndex];
  
    if (currentChairType === 'standart' || currentChairType === 'vip') {
      newSeatingArrangement[rowIndex][seatIndex] = 'selected';
      setSeatingArrangement(newSeatingArrangement);
  
      const price = currentChairType === 'vip' ? vipPrice : usualPrice;

      setSelectedSeats(prev => [
        ...prev,
        { row, seat, type: currentChairType, price }
      ]);
    }
  };
  
  const handleSeanceClick = (film, hallName, seance, selectedSeats, usualPrice) => {
    setSelectedSeance({film, hallName, seance, selectedSeats, usualPrice });
  };
  
  return (
    <main>
      <section className="buying">
        <div className="buying__info">
          <div className="buying__info-description">
            <h2 className="buying__info-title">{film}</h2>
            <p className="buying__info-start">Начало сеанса: {seance}</p>
            <p className="buying__info-hall">{hallName}</p>
          </div>
          <div className="buying__info-hint">
            <p>Тапните дважды, чтобы увеличить</p>
          </div>
        </div>

        <div className="buying-scheme">
          <div className="buying-scheme__wrapper">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="buying-scheme__row">
                {Array.from({ length: seatsInRow }).map((_, seatIndex) => {
                  const chairType = seating[rowIndex]?.[seatIndex] || 'standart'; 
                  return (
                    <span
                      key={seatIndex}
                      className={`buying-scheme__chair buying-scheme__chair_${chairType}`}
                      onClick={() => {
                        handleChairClick(rowIndex, seatIndex);
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (
                <span className="buying-scheme__legend-value">{usualPrice}</span> руб)
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (
                <span className="buying-scheme__legend-value">{vipPrice}</span> руб)
              </p>
            </div>
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано
              </p>
            </div>
          </div>
        </div>

        <Link 
          to={`/payment/${encodeURIComponent(film)}/${selectedHall.id}/${seance}/${selectedSeats.map(s => `${s.row}-${s.seat}-${s.price}`).join(',')}`} 
          onClick={() => handleSeanceClick(film, selectedHall.id, seance, selectedSeats, usualPrice)}>
          <button className="acceptin-button">Забронировать</button>
        </Link>
      </section>
    </main>
  );
};

export default SeatSelections;
