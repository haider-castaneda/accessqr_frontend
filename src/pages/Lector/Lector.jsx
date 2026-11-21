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
    <div>
      <Navbar />
      <div className="container mt-3 mb-5" style={{ maxWidth: '560px' }}>
        <h5 className="fw-bold mb-3">Portería</h5>
 
        <ul className="nav nav-pills nav-fill mb-4 bg-white rounded shadow-sm p-1">
          {PESTANAS.map((p) => (
            <li className="nav-item" key={p.id}>
              <button
                className={`nav-link ${activa === p.id ? 'active' : 'text-dark'}`}
                onClick={() => setActiva(p.id)}
              >
                {p.texto}
              </button>
            </li>
          ))}
        </ul>
 
        {activa === 'escaner' && <Escaner />}
        {activa === 'visitantes' && <Visitantes />}
        {activa === 'reponer' && <ReponerQR />}
        {activa === 'pendientes' && <PendientesCelador />}
      </div>
    </div>
  )
}
 
export default Lector