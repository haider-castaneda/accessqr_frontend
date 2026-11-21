import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Registro from './pages/Registro/Registro'
import Confirmacion from './pages/Confirmacion/Confirmacion'
import MiQR from './pages/MiQR/MiQR'
import PanelAdmin from './pages/PanelAdmin/PanelAdmin'
import Lector from './pages/Lector/Lector'
import Cargando from './components/Cargando'
import { obtener } from './services/api'
import { guardarRol, hayToken, rutaSegunRol } from './services/sesion'
 
function RutaProtegida({ children, rolesPermitidos }) {
  const [estado, setEstado] = useState('comprobando')
  const [rol, setRol] = useState(null)
 
  useEffect(() => {
    if (!hayToken()) {
      setEstado('fuera')
      return
    }
    obtener('/sesion')
      .then((datos) => {
        guardarRol(datos.rol)
        setRol(datos.rol)
        setEstado(rolesPermitidos.includes(datos.rol) ? 'dentro' : 'otro-rol')
      })
      .catch(() => setEstado('fuera'))
  }, [])
 
  if (estado === 'comprobando') return <Cargando texto="Comprobando tu sesión..." />
  if (estado === 'fuera') return <Navigate to="/" replace />
  if (estado === 'otro-rol') return <Navigate to={rutaSegunRol(rol)} replace />
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
 
        <Route
          path="/panel-admin"
          element={
            <RutaProtegida rolesPermitidos={['administrador']}>
              <PanelAdmin />
            </RutaProtegida>
          }
        />
 
        <Route
          path="/lector"
          element={
            <RutaProtegida rolesPermitidos={['celador', 'administrador']}>
              <Lector />
            </RutaProtegida>
          }
        />
 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App