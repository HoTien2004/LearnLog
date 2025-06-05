import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './components/Layout/Landing'
import Auth from './views/Auth'
import { AuthContextProvider } from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/Routing/ProtectedRoute'
import About from './views/About'
import { PostContextProvider } from './contexts/PostContext'

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App
