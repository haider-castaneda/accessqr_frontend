import { useEffect, useState } from 'react'
import { obtener, enviar } from '../../services/api'
import { fechaHora } from '../../services/formato'
import Cargando from '../../components/Cargando'
 
const VACIO = {
  usuario_login: '',
  nombre: '',
  rol: 'celador',
  contrasena: '',
}
 
function Personal() {
  const [lista, setLista] = useState([])
  const [nuevo, setNuevo] = useState(VACIO)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [cargando, setCargando] = useState(true)
 
  const cargar = async () => {
    setCargando(true)
    try {
      setLista(await obtener('/administradores'))
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
 
  const crear = async (e) => {
    e.preventDefault()
    setError('')
    setAviso('')
    try {
      await enviar('/administradores', nuevo)
      setAviso('Cuenta creada')
      setNuevo(VACIO)
      cargar()
    } catch (err) {
      setError(err.message)
    }
  }
 
  const cambiarEstado = async (id, estado) => {
    setError('')
    try {
      await enviar(`/administradores/${id}/estado`, { estado })
      cargar()
    } catch (err) {
      setError(err.message)
    }
  }
 
  return (
    <div className="row">
      <div className="col-lg-7 mb-4">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Cuentas del personal</h6>
 
            {error && <div className="alert alert-danger py-2">{error}</div>}
 
            {cargando ? (
              <Cargando />
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Usuario</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Creada</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lista.map((p) => (
                      <tr key={p.id_admin}>
                        <td>{p.nombre}</td>
                        <td>{p.usuario_login}</td>
                        <td className="text-capitalize">{p.rol}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              p.estado === 'activo' ? 'success' : 'secondary'
                            }`}
                          >
                            {p.estado}
                          </span>
                        </td>
                        <td>{fechaHora(p.fecha_creacion)}</td>
                        <td>
                          {p.estado === 'activo' ? (
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => cambiarEstado(p.id_admin, 'inactivo')}
                            >
                              Desactivar
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => cambiarEstado(p.id_admin, 'activo')}
                            >
                              Activar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
 
      <div className="col-lg-5 mb-4">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Crear cuenta nueva</h6>
 
            {aviso && <div className="alert alert-success py-2">{aviso}</div>}
 
            <form onSubmit={crear}>
              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={nuevo.nombre}
                  onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                  required
                />
              </div>
 
              <div className="mb-3">
                <label className="form-label">Documento (será su usuario)</label>
                <input
                  type="text"
                  className="form-control"
                  value={nuevo.usuario_login}
                  onChange={(e) =>
                    setNuevo({ ...nuevo, usuario_login: e.target.value })
                  }
                  required
                />
                <div className="form-text">Solo números, entre 5 y 20 dígitos.</div>
              </div>
 
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <select
                  className="form-select"
                  value={nuevo.rol}
                  onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}
                >
                  <option value="celador">Celador</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
 
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={nuevo.contrasena}
                  onChange={(e) =>
                    setNuevo({ ...nuevo, contrasena: e.target.value })
                  }
                  required
                />
                <div className="form-text">Mínimo 8 caracteres.</div>
              </div>
 
              <button className="btn btn-primary w-100">Crear cuenta</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Personal