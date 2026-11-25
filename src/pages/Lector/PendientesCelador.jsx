import { useEffect, useState } from 'react'
import { obtener, enviar } from '../../services/api'
import { fechaHora, claseInsignia } from '../../services/formato'
import Cargando from '../../components/Cargando'
import EstadoVacio from '../../components/EstadoVacio'

function PendientesCelador() {
  const [lista, setLista] = useState([])
  const [error, setError] = useState('')
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

  const revisar = async (id) => {
    try {
      await enviar(`/usuarios/${id}/revisar`)
      cargar()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="aq-tarjeta">
      <div className="aq-tarjeta__cabecera">
        <h2 className="aq-tarjeta__titulo">Solicitudes pendientes</h2>
        <button
          className="aq-btn aq-btn--contorno aq-btn--pequeno"
          onClick={cargar}
        >
          Actualizar
        </button>
      </div>

      <div className="aq-tarjeta__cuerpo">
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
            titulo="Todo al día"
            texto="No hay solicitudes esperando revisión."
          />
        ) : (
          lista.map((u) => (
            <div
              key={u.id_usuario}
              className="aq-tarjeta aq-aparece"
              style={{ padding: 16, marginBottom: 12 }}
            >
              <div className="aq-tabla__principal">{u.nombre}</div>
              <div className="aq-tabla__secundario">
                {u.tipo_documento} {u.documento}
                {' · '}
                {u.telefono}
              </div>
              <div className="aq-tabla__secundario">
                {fechaHora(u.fecha_registro)}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  marginTop: 14,
                }}
              >
                <span className={claseInsignia(u.tipo_usuario)}>
                  {u.tipo_usuario}
                </span>

                {u.revisado ? (
                  <span className="aq-insignia aq-insignia--ok">Revisado</span>
                ) : (
                  <button
                    className="aq-btn aq-btn--primario aq-btn--pequeno"
                    onClick={() => revisar(u.id_usuario)}
                  >
                    Marcar revisado
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default PendientesCelador
