import { useEffect, useState } from 'react'
import { obtener, enviar } from '../../services/api'
import { fechaHora, claseInsignia } from '../../services/formato'
import Cargando from '../../components/Cargando'
import EstadoVacio from '../../components/EstadoVacio'

function Pendientes() {
  const [lista, setLista] = useState([])
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
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

  const accion = async (id, ruta, mensaje) => {
    setError('')
    setAviso('')
    try {
      await enviar(`/usuarios/${id}/${ruta}`)
      setAviso(mensaje)
      cargar()
    } catch (err) {
      setError(err.message)
    }
  }

  const rechazar = (id, nombre) => {
    const seguro = window.confirm(`¿Rechazar la solicitud de ${nombre}?`)
    if (seguro) accion(id, 'rechazar', 'Solicitud rechazada')
  }

  if (cargando) return <Cargando />

  return (
    <div>
      <div className="aq-aviso aq-aviso--info">
        <span className="aq-aviso__punto" />
        <span>
          El botón <strong>Aprobar</strong> se habilita cuando alguien de
          portería revisa los datos contra el documento físico.
        </span>
      </div>

      {error && (
        <div className="aq-aviso aq-aviso--error">
          <span className="aq-aviso__punto" />
          <span>{error}</span>
        </div>
      )}

      {aviso && (
        <div className="aq-aviso aq-aviso--ok">
          <span className="aq-aviso__punto" />
          <span>{aviso}</span>
        </div>
      )}

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
          {lista.length === 0 ? (
            <EstadoVacio
              titulo="Todo al día"
              texto="No hay solicitudes pendientes."
            />
          ) : (
            <div className="aq-tabla-caja">
              <table className="aq-tabla">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Tipo</th>
                    <th>Solicitud</th>
                    <th>Revisado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((u) => (
                    <tr key={u.id_usuario}>
                      <td data-etiqueta="Nombre">
                        <span className="aq-tabla__principal">{u.nombre}</span>
                        <div className="aq-tabla__secundario">
                          {u.tipo_documento} {u.documento}
                        </div>
                      </td>

                      <td data-etiqueta="Teléfono" className="aq-tabla__numero">
                        {u.telefono}
                      </td>

                      <td data-etiqueta="Tipo">
                        <span className={claseInsignia(u.tipo_usuario)}>
                          {u.tipo_usuario}
                        </span>
                      </td>

                      <td data-etiqueta="Solicitud">
                        {fechaHora(u.fecha_registro)}
                      </td>

                      <td data-etiqueta="Revisado">
                        {u.revisado ? (
                          <span className="aq-insignia aq-insignia--ok">Sí</span>
                        ) : (
                          <span className="aq-insignia aq-insignia--apagado">
                            No
                          </span>
                        )}
                      </td>

                      <td data-etiqueta="Acciones">
                        <div className="aq-acciones">
                          {!u.revisado && (
                            <button
                              className="aq-btn aq-btn--contorno aq-btn--pequeno"
                              onClick={() =>
                                accion(u.id_usuario, 'revisar', 'Datos revisados')
                              }
                            >
                              Revisar
                            </button>
                          )}
                          <button
                            className="aq-btn aq-btn--acento aq-btn--pequeno"
                            disabled={!u.revisado}
                            title={
                              u.revisado ? '' : 'Primero hay que revisar los datos'
                            }
                            onClick={() =>
                              accion(
                                u.id_usuario,
                                'aprobar',
                                'Usuario aprobado, ya tiene QR'
                              )
                            }
                          >
                            Aprobar
                          </button>
                          <button
                            className="aq-btn aq-btn--peligro aq-btn--pequeno"
                            onClick={() => rechazar(u.id_usuario, u.nombre)}
                          >
                            Rechazar
                          </button>
                        </div>
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
  )
}

export default Pendientes
