import { useEffect, useState } from 'react'
import { obtener } from '../../services/api'
import { fechaHora, soloHora, claseInsignia } from '../../services/formato'
import Cargando from '../../components/Cargando'
import EstadoVacio from '../../components/EstadoVacio'
import { IcoPersonas, IcoReloj, IcoMovimiento } from '../../components/Iconos'

function Indicador({ cifra, texto, variante, icono }) {
  return (
    <div className={`aq-indicador ${variante ? 'aq-indicador--' + variante : ''}`}>
      <span className="aq-indicador__icono">{icono}</span>
      <div className="aq-indicador__cifra">{cifra}</div>
      <div className="aq-indicador__texto">{texto}</div>
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
      {error && (
        <div className="aq-aviso aq-aviso--error">
          <span className="aq-aviso__punto" />
          <span>{error}</span>
        </div>
      )}

      <div className="aq-indicadores">
        <Indicador
          cifra={indicadores?.personas_dentro ?? 0}
          texto="Personas dentro ahora"
          icono={<IcoPersonas />}
        />
        <Indicador
          cifra={indicadores?.pendientes ?? 0}
          texto="Solicitudes pendientes"
          variante="ambar"
          icono={<IcoReloj />}
        />
        <Indicador
          cifra={indicadores?.movimientos_hoy ?? 0}
          texto="Movimientos de hoy"
          variante="acento"
          icono={<IcoMovimiento />}
        />
      </div>

      <div className="aq-rejilla aq-rejilla--2">
        <section className="aq-tarjeta">
          <div className="aq-tarjeta__cabecera">
            <h2 className="aq-tarjeta__titulo">Quién está dentro</h2>
            <button
              className="aq-btn aq-btn--contorno aq-btn--pequeno"
              onClick={cargar}
            >
              Actualizar
            </button>
          </div>

          <div className="aq-tarjeta__cuerpo">
            {dentro.length === 0 ? (
              <EstadoVacio titulo="No hay nadie dentro" />
            ) : (
              <div className="aq-tabla-caja">
                <table className="aq-tabla">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Entró</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dentro.map((p) => (
                      <tr key={p.id_usuario}>
                        <td data-etiqueta="Nombre">
                          <span className="aq-tabla__principal">{p.nombre}</span>
                          <div className="aq-tabla__secundario">
                            {p.documento}
                          </div>
                        </td>
                        <td data-etiqueta="Tipo">
                          <span className={claseInsignia(p.tipo_usuario)}>
                            {p.tipo_usuario}
                          </span>
                        </td>
                        <td data-etiqueta="Entró" className="aq-tabla__numero">
                          {soloHora(p.hora_ingreso)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <section className="aq-tarjeta">
          <div className="aq-tarjeta__cabecera">
            <h2 className="aq-tarjeta__titulo">Últimos movimientos</h2>
          </div>

          <div className="aq-tarjeta__cuerpo">
            {movimientos.length === 0 ? (
              <EstadoVacio titulo="Todavía no hay movimientos hoy" />
            ) : (
              <div className="aq-tabla-caja">
                <table className="aq-tabla">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Movimiento</th>
                      <th>Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movimientos.map((m) => (
                      <tr key={m.id_registro}>
                        <td data-etiqueta="Nombre">
                          <span className="aq-tabla__principal">{m.nombre}</span>
                        </td>
                        <td data-etiqueta="Movimiento">
                          <span className={claseInsignia(m.tipo_movimiento)}>
                            {m.tipo_movimiento}
                          </span>
                        </td>
                        <td data-etiqueta="Hora" className="aq-tabla__numero">
                          {fechaHora(m.fecha_hora)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Resumen
