import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Ocorrencias from './components/Occorencias';
import OcorrenciasDetail from './components/OcorrenciasDetail';
import CheckList from './components/Checklist';
import Posit from './components/Posit';
import MateriasPerigosas from './components/MateriasPerigosas';
import MateriasPerigosasResult from './components/MateriasPerigosasResult';
import AdminHomePage from './components/AdminHomePage';
import FitaTempo from './components/FitaTempo';
import NovoPosit from './components/NovoPosit';
import VerbeteINEM from './components/VerbeteINEM';
import RelatorioFinal from './components/RelatorioFinal';
import RecordPositAudio from './components/RecordPositAudio';
import TakePicturePosit from './components/TakePicturePosit';
import InserirKms from './components/InserirKms'
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const isAuthenticated = () => {
  // Example authentication logic (check if a token exists)
  return localStorage.getItem('token') !== null;
};

const isAuthenticatedAdmin = () => {
  // Example admin authentication logic
  return localStorage.getItem('tokenAdmin') !== null;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/homepage" /> : <Login />} 
        /> 
        <Route 
          path="/" 
          element={isAuthenticated() ? <Navigate to="/homepage" /> : <Login />} 
        />

        {/* Protected Routes */}
        <Route
          path="/homepage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminHomePage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticatedAdmin()}>
              <AdminHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ocorrencias"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <Ocorrencias />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ocorrenciasDetail/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <OcorrenciasDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checklist"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <CheckList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posit"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <Posit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materiasPerigosas"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <MateriasPerigosas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/materiasPerigosasResult"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <MateriasPerigosasResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fitaTempo"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <FitaTempo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/novoPosit"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <NovoPosit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verbeteINEM"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <VerbeteINEM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorioFinal"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <RelatorioFinal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recordPositAudio"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <RecordPositAudio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/takePicturePosit"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <TakePicturePosit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inserirKms"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated()}>
              <InserirKms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
