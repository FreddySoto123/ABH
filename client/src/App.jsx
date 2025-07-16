import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MissionPage from './pages/MissionPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/mission" element={<MissionPage />} />
      </Routes>
    </div>
  );
}

export default App;
