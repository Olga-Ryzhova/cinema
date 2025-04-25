import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
const TicketCheck = () => {
  const { film, hallName, seance, selectedSeats } = useParams(); 

  const parsedSeats = selectedSeats.split(',').map(item => {
    const [row, seat, price] = item.split('-');
    return {
      row: Number(row),
      seat: Number(seat),
      price: Number(price)
    };
  });

  const totalPrice = parsedSeats.reduce((sum, s) => sum + s.price, 0);

  const rows = [...new Set(parsedSeats.map(s => s.row))]; 
  const seats = parsedSeats.map(s => s.seat);
console.log(hallName);

  return (
    <main>
      <section className="ticket">
        <header className="ticket__check">
          <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
        </header>
        
        <div className="ticket__info-wrapper">
          <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{film}</span></p>
          <p className="ticket__info">Ряд(ы): <span className="ticket__details ticket__rows">{rows.join(', ')}</span></p>
          <p className="ticket__info">Место(а): <span className="ticket__details ticket__chairs">{seats.join(', ')}</span></p>
          <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hallName}</span></p>
          <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{seance}</span></p>
          <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{totalPrice}</span> рублей</p>

          <Link to={`/ticket/${film}/${hallName}/${seance}/${rows.join(', ')}/${seats.join(', ')}`}>
            <button className="acceptin-button">Получить код бронирования</button>
          </Link>

          <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>     
    </main>
  );
};

export default TicketCheck;
