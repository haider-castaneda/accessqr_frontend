import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Escaner from './Escaner'
import Visitantes from './Visitantes'
import ReponerQR from './ReponerQR'
import PendientesCelador from './PendientesCelador'

const PESTANAS = [
  { id: 'escaner', texto: 'Escanear' },
  { id: 'visitantes', texto: 'Visitantes' },
  { id: 'reponer', texto: 'Reponer QR' },
  { id: 'pendientes', texto: 'Pendientes' },
]

function Lector() {
  const [activa, setActiva] = useState('escaner')

  return (
    <div className="aq-pagina">
      <Navbar />

      <main className="aq-contenido aq-contenido--estrecho">
        <div className="aq-encabezado-pagina">
          <h1>Portería</h1>
          <p>Registro de entradas y salidas</p>
        </div>

        <div className="aq-pestanas" role="tablist">
          {PESTANAS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={activa === p.id}
              className="aq-pestana"
              onClick={() => setActiva(p.id)}
            >
              {p.texto}
            </button>
          ))}
        </div>

        {activa === 'escaner' && <Escaner />}
        {activa === 'visitantes' && <Visitantes />}
        {activa === 'reponer' && <ReponerQR />}
        {activa === 'pendientes' && <PendientesCelador />}
      </main>
    </div>
  )
}

export default Lector
