import { useEffect, useState } from 'react'
import { obtener, enviar } from '../../services/api'
import { fechaHora } from '../../services/formato'
import Cargando from '../../components/Cargando'
 
function PendientesCelador() {
  const [lista, setLista] = useState([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)
 
  const cargar = async () => {
    setCargando(true)
    try {
      setLista(await obtener('/pendientes'))
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }
 
  useEffect(() => {
    cargar()
  }, [])
 
  const revisar = async (id) => {
    try {
      await enviar(`/usuarios/${id}/revisar`)
      cargar()
    } catch (err) {
      setError(err.message)
    }
  }
 
  if (cargando) return <Cargando />
 
  return (
    <div className="card shadow-sm">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Solicitudes pendientes</h6>
          <button className="btn btn-sm btn-outline-secondary" onClick={cargar}>
            Actualizar
          </button>
        </div>
 
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
 
        {lista.length === 0 && (
          <p className="text-muted text-center mb-0 py-3">
            No hay solicitudes pendientes.
          </p>
        )}
 
        {lista.map((u) => (
          <div key={u.id_usuario} className="border rounded p-3 mb-2">
            <div className="fw-semibold">{u.nombre}</div>
            <div className="text-muted small">
              {u.tipo_documento} {u.documento}
              {' · '}
              {u.telefono}
            </div>
            <div className="text-muted small text-capitalize mb-2">
              {u.tipo_usuario}
              {' · '}
              {fechaHora(u.fecha_registro)}
            </div>
 
            {u.revisado ? (
              <span className="badge bg-success">Revisado</span>
            ) : (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => revisar(u.id_usuario)}
              >
                Marcar como revisado
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
 
export default PendientesCelador