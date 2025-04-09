import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import LoginPage from "../pages/LoginPage";
import ControlPage from "../pages/ControlPage";
import { HallsProvider } from '../contexts/HallsContext';
import { FilmsProvider } from '../contexts/FilmsContext';
import { SeanceProvider } from '../contexts/SeanceContext';
import { PricesProvider } from '../contexts/PricesContext';
import { HallsControlProvider } from '../contexts/HallsControlContext';

const App = () => {
  return (
    <Router basename="/">
       <HallsProvider> 
        <FilmsProvider>
          <SeanceProvider>
            <PricesProvider>
              <HallsControlProvider>
                <AppHeader />
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/control" element={<ControlPage />} />
                </Routes>
              </HallsControlProvider>
            </PricesProvider>
          </SeanceProvider>
        </FilmsProvider>
      </HallsProvider>
    </Router>
  )
}

export default App;

