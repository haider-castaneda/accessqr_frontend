import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Resumen from './Resumen'
import Pendientes from './Pendientes'
import Usuarios from './Usuarios'
import Historial from './Historial'
import Reportes from './Reportes'
import Personal from './Personal'
 
const SECCIONES = [
  { id: 'resumen', texto: 'Resumen', componente: Resumen },
  { id: 'pendientes', texto: 'Pendientes', componente: Pendientes },
  { id: 'usuarios', texto: 'Usuarios', componente: Usuarios },
  { id: 'historial', texto: 'Historial', componente: Historial },
  { id: 'reportes', texto: 'Reportes', componente: Reportes },
  { id: 'personal', texto: 'Personal', componente: Personal },
]
 
function PanelAdmin() {
  const [activa, setActiva] = useState('resumen')
  const Seccion =
    SECCIONES.find((s) => s.id === activa)?.componente || Resumen
 
  return (
    <div>
      <Navbar />
      <div className="container-fluid px-4 mt-4 mb-5">
        <h4 className="fw-bold mb-3">Panel de administración</h4>
 
        <ul className="nav nav-tabs mb-4">
          {SECCIONES.map((s) => (
            <li className="nav-item" key={s.id}>
              <button
                className={`nav-link ${activa === s.id ? 'active' : ''}`}
                onClick={() => setActiva(s.id)}
              >
                {s.texto}
              </button>
            </li>
          ))}
        </ul>
 
        <Seccion />
      </div>
    </div>
  )
}
 
export default PanelAdmin
