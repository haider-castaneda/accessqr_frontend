import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Registro from './pages/Registro/Registro'
import Confirmacion from './pages/Confirmacion/Confirmacion'
import RecuperarQR from './pages/RecuperarQR/RecuperarQR'
import MiQR from './pages/MiQR/MiQR'
import Login from './pages/Login/Login'
import PanelAdmin from './pages/PanelAdmin/PanelAdmin'
import Lector from './pages/Lector/Lector'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/recuperar-qr" element={<RecuperarQR />} />
        <Route path="/mi-qr" element={<MiQR />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel-admin" element={<PanelAdmin />} />
        <Route path="/lector" element={<Lector />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App