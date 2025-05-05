import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/login" element={<Auth authRoute="login" />}/>
        <Route path="/register" element={<Auth authRoute="register" />}/>
      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
