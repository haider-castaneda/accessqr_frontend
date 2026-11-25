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

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

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
    <section className="aq-tarjeta">
      <div className="aq-tarjeta__cabecera">
        <h2 className="aq-tarjeta__titulo">Entrada y salida de visitantes</h2>
      </div>

      <div className="aq-tarjeta__cuerpo">
        {error && (
          <div className="aq-aviso aq-aviso--error">
            <span className="aq-aviso__punto" />
            <span>{error}</span>
          </div>
        )}

        {resultado && (
          <div
            className={`aq-sello ${
              resultado.tipo_movimiento === 'entrada'
                ? 'aq-sello--entrada'
                : 'aq-sello--salida'
            }`}
            style={{ padding: 18, marginBottom: 18 }}
          >
            <div className="aq-sello__tipo" style={{ fontSize: 26 }}>
              {resultado.tipo_movimiento}
            </div>
            <div className="aq-sello__nombre">{resultado.nombre}</div>
            <span className="aq-sello__hora">
              {soloHora(resultado.fecha_hora)}
            </span>
          </div>
        )}

        <form onSubmit={registrar}>
          <div className="aq-campo-grupo">
            <label className="aq-etiqueta">Número de documento</label>
            <input
              type="text"
              className="aq-campo"
              name="documento"
              value={datos.documento}
              onChange={cambiar}
              required
            />
          </div>

          <div
            className="aq-rejilla"
            style={{ gridTemplateColumns: '2fr 1fr', gap: '0 12px' }}
          >
            <div className="aq-campo-grupo">
              <label className="aq-etiqueta">Nombre</label>
              <input
                type="text"
                className="aq-campo"
                name="nombre"
                value={datos.nombre}
                onChange={cambiar}
              />
            </div>

            <div className="aq-campo-grupo">
              <label className="aq-etiqueta">Tipo</label>
              <select
                className="aq-campo"
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

          <div className="aq-campo-grupo">
            <label className="aq-etiqueta">Motivo de la visita</label>
            <input
              type="text"
              className="aq-campo"
              name="motivo_visita"
              value={datos.motivo_visita}
              onChange={cambiar}
              placeholder="Solo para la entrada"
            />
          </div>

          <button
            className="aq-btn aq-btn--primario aq-btn--bloque"
            disabled={cargando}
          >
            {cargando ? 'Registrando...' : 'Registrar movimiento'}
          </button>
        </form>

        <p className="aq-ayuda" style={{ marginTop: 14 }}>
          Si la persona ya vino antes, basta con el documento: el sistema sabe
          si le toca entrada o salida. El motivo solo se pide al entrar.
        </p>
      </div>
    </section>
  )
}

export default Visitantes
