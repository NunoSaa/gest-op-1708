import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Ocorrencias from './components/Occorencias'
import OcorrenciasDetail from './components/OcorrenciasDetail';
import CheckList from './components/Checklist';
import Posit from './components/Posit'
import MateriasPerigosas from './components/MateriasPerigosas';
import MateriasPerigosasResult from './components/MateriasPerigosasResult';
import AdminHomePage from './components/AdminHomePage';

const isAuthenticated = () => {
  // Check if the user is authenticated
  // Implement your authentication logic here, e.g., checking if a token exists in local storage
  return localStorage.getItem('token') !== null;
};

const isAuthenticatedAdmin = () => {
  // Check if the user is authenticated
  // Implement your authentication logic here, e.g., checking if a token exists in local storage
  return localStorage.getItem('tokenAdmin') !== null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/homepage" /> : <Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/adminHomePage" element={isAuthenticatedAdmin() ? <AdminHomePage/> : <Login/>}></Route>
        <Route path="/ocorrencias" element={<Ocorrencias />} />
        <Route path="/ocorrenciasDetail/:id" element={<OcorrenciasDetail />} />
        <Route path="/checklist" element={<CheckList />} />
        <Route path="/posit" element={<Posit />} />
        <Route path="/materiasPerigosas" element={<MateriasPerigosas />} />
        <Route path="/materiasPerigosasResult" element={<MateriasPerigosasResult />} />
      </Routes>
    </Router>
  );
}

export default App;
