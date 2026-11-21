import { useState } from 'react'
import { enviar } from '../../services/api'
import { soloHora } from '../../services/formato'
 
const VACIO = {
  documento: '',
  nombre: '',
  tipo_documento: 'CC',
  motivo_visita: '',
}
 
function Visitantes() {
  const [datos, setDatos] = useState(VACIO)
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
 
  const cambiar = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value })
 
  const registrar = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      const respuesta = await enviar('/visitantes', datos)
      setResultado(respuesta)
      setDatos(VACIO)
    } catch (err) {
      setError(err.message)
      setResultado(null)
    } finally {
      setCargando(false)
    }
  }
 
  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h6 className="fw-bold mb-3">Entrada y salida de visitantes</h6>
 
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
 
        {resultado && (
          <div className="alert alert-success text-center">
            <strong className="text-uppercase">{resultado.tipo_movimiento}</strong>
            {' de '}
            {resultado.nombre}
            {' a las '}
            {soloHora(resultado.fecha_hora)}
          </div>
        )}
 
        <form onSubmit={registrar}>
          <div className="mb-3">
            <label className="form-label">Número de documento</label>
            <input
              type="text"
              className="form-control"
              name="documento"
              value={datos.documento}
              onChange={cambiar}
              required
            />
          </div>
 
          <div className="row">
            <div className="col-8 mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={datos.nombre}
                onChange={cambiar}
              />
            </div>
            <div className="col-4 mb-3">
              <label className="form-label">Tipo</label>
              <select
                className="form-select"
                name="tipo_documento"
                value={datos.tipo_documento}
                onChange={cambiar}
              >
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="CE">CE</option>
              </select>
            </div>
          </div>
 
          <div className="mb-3">
            <label className="form-label">Motivo de la visita</label>
            <input
              type="text"
              className="form-control"
              name="motivo_visita"
              value={datos.motivo_visita}
              onChange={cambiar}
              placeholder="Solo para la entrada"
            />
          </div>
 
          <button className="btn btn-primary w-100" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrar movimiento'}
          </button>
        </form>
 
        <p className="text-muted small mt-3 mb-0">
          Si la persona ya vino antes, basta con el documento: el sistema sabe si
          le toca entrada o salida. El motivo solo se pide al entrar.
        </p>
      </div>
    </div>
  )
}
 
export default Visitantes