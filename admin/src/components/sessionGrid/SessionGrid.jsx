import poster from'../../i/poster.png';

const SessionGrid = () => {
  return (
    <section className="conf-step">
    <div className="conf-step__wrapper">
      <p className="conf-step__paragraph">
        <button className="conf-step__button conf-step__button-accent">Добавить фильм</button>
      </p>
      <div className="conf-step__movies">
        <div className="conf-step__movie">
          <img className="conf-step__movie-poster" alt="poster" src={poster}/>
          <h3 className="conf-step__movie-title">Звёздные войны XXIII: Атака клонированных клонов</h3>
          <p className="conf-step__movie-duration">130 минут</p>
        </div>
        
        <div className="conf-step__movie">
          <img className="conf-step__movie-poster" alt="poster" src={poster}/>
          <h3 className="conf-step__movie-title">Миссия выполнима</h3>
          <p className="conf-step__movie-duration">120 минут</p>
        </div>
        
        <div className="conf-step__movie">
          <img className="conf-step__movie-poster" alt="poster" src={poster}/>
          <h3 className="conf-step__movie-title">Серая пантера</h3>
          <p className="conf-step__movie-duration">90 минут</p>
        </div>
        
        <div className="conf-step__movie">
          <img className="conf-step__movie-poster" alt="poster" src={poster}/>
          <h3 className="conf-step__movie-title">Движение вбок</h3>
          <p className="conf-step__movie-duration">95 минут</p>
        </div>   
        
        <div className="conf-step__movie">
          <img className="conf-step__movie-poster" alt="poster" src={poster}/>
          <h3 className="conf-step__movie-title">Кот Да Винчи</h3>
          <p className="conf-step__movie-duration">100 минут</p>
        </div>            
      </div>
      
      <div className="conf-step__seances">
        <div className="conf-step__seances-hall">
          <h3 className="conf-step__seances-title">Зал 1</h3>
          <div className="conf-step__seances-timeline">
            <div className="conf-step__seances-movie" style={{width: 60, backgroundColor: 'rgb(133, 255, 137)', left: 0}}>
              <p className="conf-step__seances-movie-title">Миссия выполнима</p>
              <p className="conf-step__seances-movie-start">00:00</p>
            </div>
            <div className="conf-step__seances-movie" style={{width: 60, backgroundColor: 'rgb(133, 255, 137)',left: 360}}>
              <p className="conf-step__seances-movie-title">Миссия выполнима</p>
              <p className="conf-step__seances-movie-start">12:00</p>
            </div>
            <div className="conf-step__seances-movie" style={{width: 65, backgroundColor: 'rgb(202, 255, 133)', left: 420}}>
              <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
              <p className="conf-step__seances-movie-start">14:00</p>
            </div>              
          </div>
        </div>
        <div className="conf-step__seances-hall">
          <h3 className="conf-step__seances-title">Зал 2</h3>
          <div className="conf-step__seances-timeline">
            <div className="conf-step__seances-movie" style={{width: 65, backgroundColor: 'rgb(202, 255, 133)', left: 595}}>
              <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
              <p className="conf-step__seances-movie-start">19:50</p>
            </div>
            <div className="conf-step__seances-movie" style={{width: 60, backgroundColor: 'rgb(133, 255, 137)', left: 660}}>
              <p className="conf-step__seances-movie-title">Миссия выполнима</p>
              <p className="conf-step__seances-movie-start">22:00</p>
            </div>              
          </div>
        </div>
      </div>
      
      <fieldset className="conf-step__buttons text-center">
        <button className="conf-step__button conf-step__button-regular">Отмена</button>
        <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
      </fieldset>  
    </div>
  </section>
  )
}

export default SessionGrid;