import { useEffect, useState } from 'react'
import { obtener, enviar } from '../../services/api'
import { fechaHora } from '../../services/formato'
import Cargando from '../../components/Cargando'
 
function Pendientes() {
  const [lista, setLista] = useState([])
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
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
 
  const accion = async (id, ruta, mensaje) => {
    setError('')
    setAviso('')
    try {
      await enviar(`/usuarios/${id}/${ruta}`)
      setAviso(mensaje)
      cargar()
    } catch (err) {
      setError(err.message)
    }
  }
 
  const rechazar = (id, nombre) => {
    const seguro = window.confirm(`¿Rechazar la solicitud de ${nombre}?`)
    if (seguro) accion(id, 'rechazar', 'Solicitud rechazada')
  }
 
  if (cargando) return <Cargando />
 
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Solicitudes pendientes</h6>
          <button className="btn btn-sm btn-outline-secondary" onClick={cargar}>
            Actualizar
          </button>
        </div>
 
        {error && <div className="alert alert-danger py-2">{error}</div>}
        {aviso && <div className="alert alert-success py-2">{aviso}</div>}
 
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Teléfono</th>
                <th>Tipo</th>
                <th>Solicitud</th>
                <th>Revisado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No hay solicitudes pendientes
                  </td>
                </tr>
              ) : (
                lista.map((u) => (
                  <tr key={u.id_usuario}>
                    <td>{u.nombre}</td>
                    <td>
                      {u.tipo_documento} {u.documento}
                    </td>
                    <td>{u.telefono}</td>
                    <td className="text-capitalize">{u.tipo_usuario}</td>
                    <td>{fechaHora(u.fecha_registro)}</td>
                    <td>
                      {u.revisado ? (
                        <span className="badge bg-success">Sí</span>
                      ) : (
                        <span className="badge bg-secondary">No</span>
                      )}
                    </td>
                    <td>
                      {!u.revisado && (
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() =>
                            accion(u.id_usuario, 'revisar', 'Datos revisados')
                          }
                        >
                          Revisar
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-success me-2"
                        disabled={!u.revisado}
                        title={u.revisado ? '' : 'Primero hay que revisar los datos'}
                        onClick={() =>
                          accion(u.id_usuario, 'aprobar', 'Usuario aprobado, ya tiene QR')
                        }
                      >
                        Aprobar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => rechazar(u.id_usuario, u.nombre)}
                      >
                        Rechazar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
 
export default Pendientes