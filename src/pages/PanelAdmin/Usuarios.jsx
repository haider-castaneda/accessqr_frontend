import { useEffect, useState } from 'react'
import { obtener, enviar } from '../../services/api'
import { fechaHora, claseInsignia } from '../../services/formato'
import Cargando from '../../components/Cargando'
import EstadoVacio from '../../components/EstadoVacio'

const ESTADOS = ['', 'pendiente', 'activo', 'inactivo', 'rechazado']

function Usuarios() {
  const [lista, setLista] = useState([])
  const [filtro, setFiltro] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)

  const cargar = async (estado) => {
    setCargando(true)
    try {
      const ruta = estado ? `/usuarios?estado=${estado}` : '/usuarios'
      setLista(await obtener(ruta))
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargar(filtro)
  }, [filtro])

  const cambiarEstado = async (id, estado) => {
    try {
      await enviar(`/usuarios/${id}/estado`, { estado })
      cargar(filtro)
    } catch (err) {
      setError(err.message)
    }
  }

  const reabrir = async (id) => {
    try {
      await enviar(`/usuarios/${id}/reabrir`)
      cargar(filtro)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="aq-tarjeta">
      <div className="aq-tarjeta__cabecera">
        <h2 className="aq-tarjeta__titulo">Usuarios registrados</h2>
        <select
          className="aq-campo"
          style={{ maxWidth: 210, padding: '8px 12px' }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e === '' ? 'Todos los estados' : e}
            </option>
          ))}
        </select>
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
            titulo="Sin resultados"
            texto="No hay usuarios con ese estado."
          />
        ) : (
          <div className="aq-tabla-caja">
            <table className="aq-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((u) => (
                  <tr key={u.id_usuario}>
                    <td data-etiqueta="Nombre">
                      <span className="aq-tabla__principal">{u.nombre}</span>
                      {u.motivo_visita && (
                        <div className="aq-tabla__secundario">
                          {u.motivo_visita}
                        </div>
                      )}
                    </td>

                    <td data-etiqueta="Documento" className="aq-tabla__numero">
                      {u.tipo_documento} {u.documento}
                    </td>

                    <td data-etiqueta="Tipo">
                      <span className={claseInsignia(u.tipo_usuario)}>
                        {u.tipo_usuario}
                      </span>
                    </td>

                    <td data-etiqueta="Estado">
                      <span className={claseInsignia(u.estado)}>{u.estado}</span>
                    </td>

                    <td data-etiqueta="Registro">
                      {fechaHora(u.fecha_registro)}
                    </td>

                    <td data-etiqueta="Acciones">
                      <div className="aq-acciones">
                        {u.estado === 'activo' && (
                          <button
                            className="aq-btn aq-btn--contorno aq-btn--pequeno"
                            onClick={() => cambiarEstado(u.id_usuario, 'inactivo')}
                          >
                            Desactivar
                          </button>
                        )}
                        {u.estado === 'inactivo' && (
                          <button
                            className="aq-btn aq-btn--acento aq-btn--pequeno"
                            onClick={() => cambiarEstado(u.id_usuario, 'activo')}
                          >
                            Activar
                          </button>
                        )}
                        {u.estado === 'rechazado' && (
                          <button
                            className="aq-btn aq-btn--primario aq-btn--pequeno"
                            onClick={() => reabrir(u.id_usuario)}
                          >
                            Reabrir solicitud
                          </button>
                        )}
                        {u.estado === 'pendiente' && (
                          <span className="aq-ayuda" style={{ margin: 0 }}>
                            Se gestiona en Pendientes
                          </span>
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
  )
}

export default Usuarios
