import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing/Landing'
import Auth from './views/Auth'
import { AuthContextProvider } from './contexts/AuthContext'
import Dashboard from './views/Dashboard'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/login" element={<Auth authRoute="login" />}/>
          <Route path="/register" element={<Auth authRoute="register" />}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
