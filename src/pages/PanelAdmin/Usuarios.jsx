import { useEffect, useState } from 'react'
import { obtener, enviar } from '../../services/api'
import { fechaHora } from '../../services/formato'
import Cargando from '../../components/Cargando'
 
const ESTADOS = ['', 'pendiente', 'activo', 'inactivo', 'rechazado']
 
const COLOR = {
  activo: 'success',
  pendiente: 'warning',
  inactivo: 'secondary',
  rechazado: 'danger',
}
 
function Usuarios() {
  const [lista, setLista] = useState([])
  const [filtro, setFiltro] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)
 
  const cargar = async (estado) => {
    setCargando(true)
    try {
      const ruta = estado ? `/usuarios?estado=${estado}` : '/usuarios'
      setLista(await obtener(ruta))
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }
 
  useEffect(() => {
    cargar(filtro)
  }, [filtro])
 
  const cambiarEstado = async (id, estado) => {
    try {
      await enviar(`/usuarios/${id}/estado`, { estado })
      cargar(filtro)
    } catch (err) {
      setError(err.message)
    }
  }
 
  const reabrir = async (id) => {
    try {
      await enviar(`/usuarios/${id}/reabrir`)
      cargar(filtro)
    } catch (err) {
      setError(err.message)
    }
  }
 
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Usuarios registrados</h6>
          <select
            className="form-select form-select-sm"
            style={{ maxWidth: '200px' }}
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            {ESTADOS.map((e) => (
              <option key={e} value={e}>
                {e === '' ? 'Todos los estados' : e}
              </option>
            ))}
          </select>
        </div>
 
        {error && <div className="alert alert-danger py-2">{error}</div>}
 
        {cargando ? (
          <Cargando />
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {lista.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No hay usuarios con ese estado
                    </td>
                  </tr>
                ) : (
                  lista.map((u) => (
                    <tr key={u.id_usuario}>
                      <td>
                        {u.nombre}
                        {u.motivo_visita && (
                          <div className="text-muted small">{u.motivo_visita}</div>
                        )}
                      </td>
                      <td>
                        {u.tipo_documento} {u.documento}
                      </td>
                      <td className="text-capitalize">{u.tipo_usuario}</td>
                      <td>
                        <span className={`badge bg-${COLOR[u.estado] || 'light'}`}>
                          {u.estado}
                        </span>
                      </td>
                      <td>{fechaHora(u.fecha_registro)}</td>
                      <td>
                        {u.estado === 'activo' && (
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => cambiarEstado(u.id_usuario, 'inactivo')}
                          >
                            Desactivar
                          </button>
                        )}
                        {u.estado === 'inactivo' && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => cambiarEstado(u.id_usuario, 'activo')}
                          >
                            Activar
                          </button>
                        )}
                        {u.estado === 'rechazado' && (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => reabrir(u.id_usuario)}
                          >
                            Reabrir solicitud
                          </button>
                        )}
                        {u.estado === 'pendiente' && (
                          <span className="text-muted small">
                            Se gestiona en Pendientes
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
 
export default Usuarios