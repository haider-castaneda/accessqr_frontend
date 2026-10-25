import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Registro from './pages/Registro/Registro'
import Confirmacion from './pages/Confirmacion/Confirmacion'
import RecuperarQR from './pages/RecuperarQR/RecuperarQR'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/recuperar-qr" element={<RecuperarQR />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App