import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import HallPage from "../pages/HallPage";
import PaymentPage from "../pages/PaymentPage";
import TicketPage from "../pages/TicketPage";
import { useEffect, useState } from 'react';

function App() {


  return (
    <Router basename="/">
      <AppHeader />
      <Routes>
        <Route path="/cinema" element={<MainPage />} />
        <Route path="/hall" element={<HallPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default App;
