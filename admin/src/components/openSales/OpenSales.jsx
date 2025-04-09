import { useState } from "react";

const OpenSales = () => {
  const [btnOpenSales, setBtnOpenSales] = useState('Открыть продажу билетов');

  const closeSales = () => {
    setBtnOpenSales('Приостановить продажу билетов');
  }

  return (
    <section className="conf-step">
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button className="conf-step__button conf-step__button-accent" onClick={closeSales}>{btnOpenSales}</button>
      </div>
    </section>    
  )
}

export default OpenSales;