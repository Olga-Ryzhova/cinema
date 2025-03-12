import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import LoginPage from "../pages/LoginPage";
import ControlPage from "../pages/ControlPage";


const App = () => {
  return (
    <Router basename="/">
      <AppHeader />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/control" element={<ControlPage />} />
      </Routes>
    </Router>
  )
}

export default App;

