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
  const Seccion = SECCIONES.find((s) => s.id === activa)?.componente || Resumen

  return (
    <div className="aq-pagina">
      <Navbar />

      <main className="aq-contenido">
        <div className="aq-encabezado-pagina">
          <h1>Panel de administración</h1>
          <p>
            {new Date().toLocaleDateString('es-CO', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="aq-pestanas" role="tablist">
          {SECCIONES.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activa === s.id}
              className="aq-pestana"
              onClick={() => setActiva(s.id)}
            >
              {s.texto}
            </button>
          ))}
        </div>

        <Seccion />
      </main>
    </div>
  )
}

export default PanelAdmin
