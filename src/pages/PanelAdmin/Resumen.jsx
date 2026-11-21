import { useEffect, useState } from 'react'
import { obtener } from '../../services/api'
import { fechaHora, soloHora } from '../../services/formato'
import Cargando from '../../components/Cargando'
 
function Tarjeta({ titulo, valor, color }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm text-center h-100">
        <div className="card-body py-4">
          <div className={`display-5 fw-bold text-${color}`}>{valor}</div>
          <div className="text-muted">{titulo}</div>
        </div>
      </div>
    </div>
  )
}
 
function Resumen() {
  const [indicadores, setIndicadores] = useState(null)
  const [dentro, setDentro] = useState([])
  const [movimientos, setMovimientos] = useState([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)
 
  const cargar = async () => {
    setCargando(true)
    try {
      const [ind, den, mov] = await Promise.all([
        obtener('/indicadores'),
        obtener('/dentro'),
        obtener('/movimientos?limite=10'),
      ])
      setIndicadores(ind)
      setDentro(den)
      setMovimientos(mov)
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
 
  if (cargando) return <Cargando />
 
  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
 
      <div className="row">
        <Tarjeta
          titulo="Personas dentro"
          valor={indicadores?.personas_dentro ?? 0}
          color="primary"
        />
        <Tarjeta
          titulo="Solicitudes pendientes"
          valor={indicadores?.pendientes ?? 0}
          color="warning"
        />
        <Tarjeta
          titulo="Movimientos de hoy"
          valor={indicadores?.movimientos_hoy ?? 0}
          color="success"
        />
      </div>
 
      <div className="text-end mb-3">
        <button className="btn btn-sm btn-outline-secondary" onClick={cargar}>
          Actualizar
        </button>
      </div>
 
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Quién está dentro</h6>
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Entró</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dentro.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center text-muted py-3">
                          No hay nadie dentro
                        </td>
                      </tr>
                    ) : (
                      dentro.map((p) => (
                        <tr key={p.id_usuario}>
                          <td>{p.nombre}</td>
                          <td className="text-capitalize">{p.tipo_usuario}</td>
                          <td>{soloHora(p.hora_ingreso)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
 
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Últimos movimientos</h6>
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Movimiento</th>
                      <th>Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movimientos.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center text-muted py-3">
                          Todavía no hay movimientos hoy
                        </td>
                      </tr>
                    ) : (
                      movimientos.map((m) => (
                        <tr key={m.id_registro}>
                          <td>{m.nombre}</td>
                          <td>
                            <span
                              className={`badge bg-${
                                m.tipo_movimiento === 'entrada' ? 'success' : 'secondary'
                              }`}
                            >
                              {m.tipo_movimiento}
                            </span>
                          </td>
                          <td>{fechaHora(m.fecha_hora)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Resumen