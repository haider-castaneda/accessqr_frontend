import { useEffect, useState } from 'react'
import { obtener } from '../../services/api'
import { fechaHora, hoy, claseInsignia } from '../../services/formato'
import Cargando from '../../components/Cargando'
import EstadoVacio from '../../components/EstadoVacio'

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
    <section className="aq-tarjeta">
      <div className="aq-tarjeta__cabecera">
        <h2 className="aq-tarjeta__titulo">Historial de movimientos</h2>
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

          <div>
            <label className="aq-etiqueta">Documento (opcional)</label>
            <input
              type="text"
              className="aq-campo"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>

          <button className="aq-btn aq-btn--primario" disabled={cargando}>
            Buscar
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
            titulo="Sin movimientos"
            texto="No hay registros en ese rango de fechas."
          />
        ) : (
          <>
            <p className="aq-conteo">
              {lista.length} movimiento(s) encontrado(s)
            </p>

            <div className="aq-tabla-caja">
              <table className="aq-tabla">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Tipo</th>
                    <th>Movimiento</th>
                    <th>Atendió</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((m) => (
                    <tr key={m.id_registro}>
                      <td data-etiqueta="Fecha" className="aq-tabla__numero">
                        {fechaHora(m.fecha_hora)}
                      </td>

                      <td data-etiqueta="Nombre">
                        <span className="aq-tabla__principal">{m.nombre}</span>
                      </td>

                      <td data-etiqueta="Documento" className="aq-tabla__numero">
                        {m.documento}
                      </td>

                      <td data-etiqueta="Tipo">
                        <span className={claseInsignia(m.tipo_usuario)}>
                          {m.tipo_usuario}
                        </span>
                      </td>

                      <td data-etiqueta="Movimiento">
                        <span className={claseInsignia(m.tipo_movimiento)}>
                          {m.tipo_movimiento}
                        </span>
                      </td>

                      <td data-etiqueta="Atendió">{m.atendido_por || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Historial
