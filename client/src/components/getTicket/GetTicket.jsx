import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode'; 

const GetTicket = () => {
  const { film, hallName, seance, rows, seats } = useParams(); 
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const qrText = `Фильм: ${film}\nЗал: ${hallName}\nСеанс: ${seance}\nРяд(ы): ${rows}\nМесто(а): ${seats}`;
    
    QRCode.toDataURL(qrText)
      .then(url => setQrUrl(url))
      .catch(err => console.error(err));
  }, [film, hallName, seance, rows, seats]);

  return (
    <main>
      <section className="ticket">
        <header className="tichet__check">
          <h2 className="ticket__check-title">Электронный билет</h2>
        </header>
        
        <div className="ticket__info-wrapper">
          <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{film}</span></p>
          <p className="ticket__info">Ряд(ы): <span className="ticket__details ticket__rows">{rows}</span></p>
          <p className="ticket__info">Место(а): <span className="ticket__details ticket__chairs">{seats}</span></p>
          <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hallName}</span></p>
          <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{seance}</span></p>

          {qrUrl && <img className="ticket__info-qr" src={qrUrl} alt="QR код билета" />}

          <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>     
    </main>
  );
}

export default GetTicket;
