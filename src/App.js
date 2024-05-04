import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Ocorrencias from './components/Occorencias'
import OcorrenciasDetail from './components/OcorrenciasDetail';

const isAuthenticated = () => {
  // Check if the user is authenticated
  // Implement your authentication logic here, e.g., checking if a token exists in local storage
  return localStorage.getItem('token') !== null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/homepage" /> : <Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/ocorrencias" element={<Ocorrencias />} />
        <Route path="/ocorrenciasDetail/:id" element={<OcorrenciasDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
