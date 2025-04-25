import { useState } from "react";

import HallManagement from "../hallManagement/HallManagement";
import HallConfiguration from "../hallConfiguration/HallConfiguration";
import PriceConfigurations from "../priceConfigurations/PriceConfigurations";
import SessionGrid from "../sessionGrid/SessionGrid";
import OpenSales from "../openSales/OpenSales";
import HeaderToggle from "../headerToggle/HeaderToggle";


const ControlPage = () => {
  const [activeSections, setActiveSections] = useState([]);

  const sections = [
    {title: 'Конфигурация залов', content: <HallManagement/>},
    {title: 'Управление залами', content: <HallConfiguration/>},
    {title: 'Конфигурация цен', content: <PriceConfigurations/>},
    {title: 'Сетка сеансов', content: <SessionGrid/>},
    {title: 'Открыть продажи', content: <OpenSales/>},
  ]

  const toggleSection = (index) => {
    setActiveSections(prevActiveSections => {
      if (prevActiveSections.includes(index)) {
        // Если секция уже открыта, закрыть её
        return prevActiveSections.filter(i => i !== index);
      } else {
        // Если секция не открыта, открыть её
        return [...prevActiveSections, index];
      }
    });
  }

  return (
    <main className="conf-steps">
      {
        sections.map((section, index) => (
          <div key={index}>
            <HeaderToggle 
              title={section.title}
              isOpen={activeSections.includes(index)}  
              onToggle={() => toggleSection(index)}
            />
            {activeSections.includes(index) && section.content}
          </div>
        ))
      }
    </main>
  );
}

export default ControlPage;