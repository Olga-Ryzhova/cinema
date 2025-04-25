import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import HallPage from "../pages/HallPage";
import PaymentPage from "../pages/PaymentPage";
import TicketPage from "../pages/TicketPage";
import { FilmsProvider } from '../contexts/FilmsContext';
import { SeanceProvider } from '../contexts/SeanceContext';
import { HallsProvider } from '../contexts/HallsContext';
import { HallsControlProvider } from '../contexts/HallsControlContext';
import { PricesProvider } from '../contexts/PricesContext';
function App() {

  return (
    <Router basename="/">
      <HallsProvider>
        <FilmsProvider>
          <SeanceProvider>
            <PricesProvider>
              <HallsControlProvider>
                <AppHeader />
                <Routes>
                  <Route path="/cinema" element={<MainPage />} />
                  <Route path="/hall/:film/:hallName/:seance" element={<HallPage />} />
                  <Route path="/payment/:film/:hallName/:seance/:selectedSeats/" element={<PaymentPage />} />
                  <Route path="/ticket/:film/:hallName/:seance/:rows/:seats" element={<TicketPage />} />
                  <Route path="/" element={<MainPage />} />
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