import { Routes, Route, Navigate } from 'react-router-dom';
import PersonasPage from './pages/PersonasPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/personas" replace />} />
        <Route path="/personas" element={<PersonasPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
