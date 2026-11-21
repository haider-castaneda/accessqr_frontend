import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Registro from './pages/Registro/Registro'
import Confirmacion from './pages/Confirmacion/Confirmacion'
import MiQR from './pages/MiQR/MiQR'
import PanelAdmin from './pages/PanelAdmin/PanelAdmin'
import Lector from './pages/Lector/Lector'

function RutaProtegida({ children, rolesPermitidos }) {
  const token = localStorage.getItem('token')
  const rol = localStorage.getItem('rol')
  if (!token) return <Navigate to="/" replace />
  if (rolesPermitidos && !rolesPermitidos.includes(rol)) return <Navigate to="/" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/mi-qr" element={<MiQR />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/panel-admin" element={
          <RutaProtegida rolesPermitidos={['administrador']}>
            <PanelAdmin />
          </RutaProtegida>
        } />
        <Route path="/lector" element={
          <RutaProtegida rolesPermitidos={['celador', 'administrador']}>
            <Lector />
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
