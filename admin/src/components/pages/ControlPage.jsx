import { useState } from "react";

import HallManagement from "../hallManagement/HallManagement";
import HallConfiguration from "../hallConfiguration/HallConfiguration";
import PriceConfigurations from "../priceConfigurations/PriceConfigurations";
import SessionGrid from "../sessionGrid/SessionGrid";
import OpenSales from "../openSales/OpenSales";
import HeaderToggle from "../headerToggle/HeaderToggle";


const ControlPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {title: 'Конфигурация залов', content: <HallManagement/>},
    {title: 'Управление залами', content: <HallConfiguration/>},
    {title: 'Конфигурация цен', content: <PriceConfigurations/>},
    {title: 'Сетка сеансов', content: <SessionGrid/>},
    {title: 'Открыть продажи', content: <OpenSales/>},
  ]

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  }

  return (
    <main className="conf-steps">
      {
        sections.map((section, index) => (
          <div key={index}>
            <HeaderToggle 
              key={index}
              title={section.title}
              isOpen={activeSection === index}  
              onToggle={() => toggleSection(index)}/>
              {activeSection === index && section.content}
          </div>
        ))
      }
    </main>
  )
}

export default ControlPage;