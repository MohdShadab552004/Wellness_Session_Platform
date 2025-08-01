import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute'; 
import { AuthProvider } from './context/authContext';
const App = () => {
  return (
    <AuthProvider> {/* Wrap your app with UserProvider */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />

          {/*  Protected routes */}
          <Route
            path='/my-sessions'
            element={
              <ProtectedRoute>
                <MySessions />
              </ProtectedRoute>
            }
          />
          <Route
            path='/session-editor'
            element={
              <ProtectedRoute>
                <SessionEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path='/session-editor/:id'
            element={
              <ProtectedRoute>
                <SessionEditor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
