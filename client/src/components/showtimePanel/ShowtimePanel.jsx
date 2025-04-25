import { useState } from 'react';

const days = [
  { week: 'Пн', number: '31', today: true },
  { week: 'Вт', number: '1' },
  { week: 'Ср', number: '2' },
  { week: 'Чт', number: '3' },
  { week: 'Пт', number: '4' },
  { week: 'Сб', number: '5', weekend: true },
];

const ShowtimePanel = () => {
  const [activeDay, setActiveDay] = useState('31'); 

  return (
    <nav className="page-nav">
      {days.map(({ week, number, today, weekend }) => {
        let classNames = 'page-nav__day';
        if (today) classNames += ' page-nav__day_today';
        if (weekend) classNames += ' page-nav__day_weekend';
        if (activeDay === number) classNames += ' page-nav__day_chosen';

        return (
          <div
            key={number}
            className={classNames}
            onClick={() => setActiveDay(number)}
          >
            <span className="page-nav__day-week">{week}</span>
            <span className="page-nav__day-number">{number}</span>
          </div>
        );
      })}

      <div className="page-nav__day page-nav__day_next" />
    </nav>
  );
};

export default ShowtimePanel;
