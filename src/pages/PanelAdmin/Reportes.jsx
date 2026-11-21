import { useEffect, useState } from 'react'
import { obtener } from '../../services/api'
import { fechaHora, hoy } from '../../services/formato'
import Cargando from '../../components/Cargando'
 
function Reportes() {
  const [desde, setDesde] = useState(hoy())
  const [hasta, setHasta] = useState(hoy())
  const [lista, setLista] = useState([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
 
  const buscar = async (e) => {
    if (e) e.preventDefault()
    setCargando(true)
    try {
      setLista(await obtener(`/reportes?desde=${desde}&hasta=${hasta}`))
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
        <h6 className="fw-bold mb-3">Reporte por persona</h6>
 
        <form className="row g-2 align-items-end mb-3" onSubmit={buscar}>
          <div className="col-md-4">
            <label className="form-label small">Desde</label>
            <input
              type="date"
              className="form-control"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small">Hasta</label>
            <input
              type="date"
              className="form-control"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" disabled={cargando}>
              Generar reporte
            </button>
          </div>
        </form>
 
        {error && <div className="alert alert-danger py-2">{error}</div>}
 
        {cargando ? (
          <Cargando />
        ) : (
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Tipo</th>
                  <th className="text-center">Entradas</th>
                  <th className="text-center">Salidas</th>
                  <th>Primero</th>
                  <th>Último</th>
                </tr>
              </thead>
              <tbody>
                {lista.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      Sin datos en ese rango
                    </td>
                  </tr>
                ) : (
                  lista.map((r) => (
                    <tr key={r.documento}>
                      <td>{r.nombre}</td>
                      <td>{r.documento}</td>
                      <td className="text-capitalize">{r.tipo_usuario}</td>
                      <td className="text-center fw-bold">{r.entradas}</td>
                      <td className="text-center fw-bold">{r.salidas}</td>
                      <td>{fechaHora(r.primer_movimiento)}</td>
                      <td>{fechaHora(r.ultimo_movimiento)}</td>
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
 
export default Reportes