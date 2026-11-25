import { useEffect, useState } from 'react'
import { obtener, enviar } from '../../services/api'
import { fechaHora, claseInsignia } from '../../services/formato'
import Cargando from '../../components/Cargando'
import EstadoVacio from '../../components/EstadoVacio'

const VACIO = {
  usuario_login: '',
  nombre: '',
  rol: 'celador',
  contrasena: '',
}

function Personal() {
  const [lista, setLista] = useState([])
  const [nuevo, setNuevo] = useState(VACIO)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [cargando, setCargando] = useState(true)

  const cargar = async () => {
    setCargando(true)
    try {
      setLista(await obtener('/administradores'))
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

  const crear = async (e) => {
    e.preventDefault()
    setError('')
    setAviso('')
    try {
      await enviar('/administradores', nuevo)
      setAviso('Cuenta creada')
      setNuevo(VACIO)
      cargar()
    } catch (err) {
      setError(err.message)
    }
  }

  const cambiarEstado = async (id, estado) => {
    setError('')
    try {
      await enviar(`/administradores/${id}/estado`, { estado })
      cargar()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
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

      <div className="aq-rejilla aq-rejilla--ancha-estrecha">

        <section className="aq-tarjeta">
          <div className="aq-tarjeta__cabecera">
            <h2 className="aq-tarjeta__titulo">Cuentas del personal</h2>
          </div>

          <div className="aq-tarjeta__cuerpo">
            {cargando ? (
              <Cargando />
            ) : lista.length === 0 ? (
              <EstadoVacio titulo="No hay cuentas de personal" />
            ) : (
              <div className="aq-tabla-caja">
                <table className="aq-tabla">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Usuario</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Creada</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lista.map((p) => (
                      <tr key={p.id_admin}>
                        <td data-etiqueta="Nombre">
                          <span className="aq-tabla__principal">{p.nombre}</span>
                        </td>

                        <td data-etiqueta="Usuario" className="aq-tabla__numero">
                          {p.usuario_login}
                        </td>

                        <td data-etiqueta="Rol">
                          <span className="aq-insignia aq-insignia--info">
                            {p.rol}
                          </span>
                        </td>

                        <td data-etiqueta="Estado">
                          <span className={claseInsignia(p.estado)}>
                            {p.estado}
                          </span>
                        </td>

                        <td data-etiqueta="Creada">
                          {fechaHora(p.fecha_creacion)}
                        </td>

                        <td data-etiqueta="Acciones">
                          <div className="aq-acciones">
                            {p.estado === 'activo' ? (
                              <button
                                className="aq-btn aq-btn--contorno aq-btn--pequeno"
                                onClick={() =>
                                  cambiarEstado(p.id_admin, 'inactivo')
                                }
                              >
                                Desactivar
                              </button>
                            ) : (
                              <button
                                className="aq-btn aq-btn--acento aq-btn--pequeno"
                                onClick={() => cambiarEstado(p.id_admin, 'activo')}
                              >
                                Activar
                              </button>
                            )}
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

        <section className="aq-tarjeta">
          <div className="aq-tarjeta__cabecera">
            <h2 className="aq-tarjeta__titulo">Crear cuenta nueva</h2>
          </div>

          <form className="aq-tarjeta__cuerpo" onSubmit={crear}>
            <div className="aq-campo-grupo">
              <label className="aq-etiqueta">Nombre completo</label>
              <input
                type="text"
                className="aq-campo"
                value={nuevo.nombre}
                onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                required
              />
            </div>

            <div className="aq-campo-grupo">
              <label className="aq-etiqueta">Documento (será su usuario)</label>
              <input
                type="text"
                className="aq-campo"
                value={nuevo.usuario_login}
                onChange={(e) =>
                  setNuevo({ ...nuevo, usuario_login: e.target.value })
                }
                required
              />
              <p className="aq-ayuda">Solo números, entre 5 y 20 dígitos.</p>
            </div>

            <div className="aq-campo-grupo">
              <label className="aq-etiqueta">Rol</label>
              <select
                className="aq-campo"
                value={nuevo.rol}
                onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}
              >
                <option value="celador">Celador</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            <div className="aq-campo-grupo">
              <label className="aq-etiqueta">Contraseña</label>
              <input
                type="password"
                className="aq-campo"
                value={nuevo.contrasena}
                onChange={(e) =>
                  setNuevo({ ...nuevo, contrasena: e.target.value })
                }
                required
              />
              <p className="aq-ayuda">Mínimo 8 caracteres.</p>
            </div>

            <button className="aq-btn aq-btn--primario aq-btn--bloque">
              Crear cuenta
            </button>
          </form>
        </section>

      </div>
    </div>
  )
}

export default Personal
