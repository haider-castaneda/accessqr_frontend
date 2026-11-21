import { useEffect, useState } from 'react'
import { obtener } from '../../services/api'
import { fechaHora, hoy } from '../../services/formato'
import Cargando from '../../components/Cargando'
 
function Historial() {
  const [desde, setDesde] = useState(hoy())
  const [hasta, setHasta] = useState(hoy())
  const [documento, setDocumento] = useState('')
  const [lista, setLista] = useState([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
 
  const buscar = async (e) => {
    if (e) e.preventDefault()
    setCargando(true)
    try {
      const parametros = new URLSearchParams({ desde, hasta })
      if (documento.trim()) parametros.set('documento', documento.trim())
      setLista(await obtener(`/historial?${parametros}`))
      setError('')
    } catch (err) {
      setError(err.message)
      setLista([])
    } finally {
      setCargando(false)
    }
  }
 
  useEffect(() => {
    buscar()
  }, [])
 
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="fw-bold mb-3">Historial de movimientos</h6>
 
        <form className="row g-2 align-items-end mb-3" onSubmit={buscar}>
          <div className="col-md-3">
            <label className="form-label small">Desde</label>
            <input
              type="date"
              className="form-control"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label small">Hasta</label>
            <input
              type="date"
              className="form-control"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small">Documento (opcional)</label>
            <input
              type="text"
              className="form-control"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" disabled={cargando}>
              Buscar
            </button>
          </div>
        </form>
 
        {error && <div className="alert alert-danger py-2">{error}</div>}
 
        {cargando ? (
          <Cargando />
        ) : (
          <>
            <p className="text-muted small">
              {lista.length} movimiento(s) encontrado(s)
            </p>
            <div className="table-responsive">
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>Fecha y hora</th>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Tipo</th>
                    <th>Movimiento</th>
                    <th>Atendió</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No hay movimientos en ese rango
                      </td>
                    </tr>
                  ) : (
                    lista.map((m) => (
                      <tr key={m.id_registro}>
                        <td>{fechaHora(m.fecha_hora)}</td>
                        <td>{m.nombre}</td>
                        <td>{m.documento}</td>
                        <td className="text-capitalize">{m.tipo_usuario}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              m.tipo_movimiento === 'entrada' ? 'success' : 'secondary'
                            }`}
                          >
                            {m.tipo_movimiento}
                          </span>
                        </td>
                        <td>{m.atendido_por || '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
 
export default Historial