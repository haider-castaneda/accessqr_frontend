import { useEffect, useState } from 'react'
import { obtener } from '../../services/api'
import { fechaHora, hoy, claseInsignia } from '../../services/formato'
import Cargando from '../../components/Cargando'
import EstadoVacio from '../../components/EstadoVacio'

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
    <section className="aq-tarjeta">
      <div className="aq-tarjeta__cabecera">
        <h2 className="aq-tarjeta__titulo">Reporte por persona</h2>
      </div>

      <div className="aq-tarjeta__cuerpo">
        <form className="aq-filtros" onSubmit={buscar}>
          <div>
            <label className="aq-etiqueta">Desde</label>
            <input
              type="date"
              className="aq-campo"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>

          <div>
            <label className="aq-etiqueta">Hasta</label>
            <input
              type="date"
              className="aq-campo"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>

          <button className="aq-btn aq-btn--primario" disabled={cargando}>
            Generar reporte
          </button>
        </form>

        {error && (
          <div className="aq-aviso aq-aviso--error">
            <span className="aq-aviso__punto" />
            <span>{error}</span>
          </div>
        )}

        {cargando ? (
          <Cargando />
        ) : lista.length === 0 ? (
          <EstadoVacio
            titulo="Sin datos"
            texto="No hubo movimientos en ese rango."
          />
        ) : (
          <div className="aq-tabla-caja">
            <table className="aq-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Tipo</th>
                  <th>Entradas</th>
                  <th>Salidas</th>
                  <th>Primero</th>
                  <th>Último</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((r) => (
                  <tr key={r.documento}>
                    <td data-etiqueta="Nombre">
                      <span className="aq-tabla__principal">{r.nombre}</span>
                    </td>

                    <td data-etiqueta="Documento" className="aq-tabla__numero">
                      {r.documento}
                    </td>

                    <td data-etiqueta="Tipo">
                      <span className={claseInsignia(r.tipo_usuario)}>
                        {r.tipo_usuario}
                      </span>
                    </td>

                    <td data-etiqueta="Entradas" className="aq-tabla__numero">
                      <strong>{r.entradas}</strong>
                    </td>

                    <td data-etiqueta="Salidas" className="aq-tabla__numero">
                      <strong>{r.salidas}</strong>
                    </td>

                    <td data-etiqueta="Primero" className="aq-tabla__numero">
                      {fechaHora(r.primer_movimiento)}
                    </td>

                    <td data-etiqueta="Último" className="aq-tabla__numero">
                      {fechaHora(r.ultimo_movimiento)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default Reportes
