import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PublicationsPage from './pages/PublicationsPage.jsx';
import MissionPage from './pages/MissionPage.jsx';
import VirtualTour from './pages/VirtualTour.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ActivitiesPage from './pages/ActivitiesPage.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publicaciones" element={<PublicationsPage />} />
        <Route path="/mision" element={<MissionPage />} />
        <Route path="/contacto" element={<ContactPage />} /> 
         <Route path="/actividades" element={<ActivitiesPage />} />
        <Route path="/visita-virtual" element={<VirtualTour />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
