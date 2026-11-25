import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { enviar } from '../../services/api'

function Registro() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_documento: '',
    documento: '',
    telefono: '',
    tipo_usuario: '',
    contrasena: '',
    confirmar_contrasena: '',
  })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (formData.contrasena !== formData.confirmar_contrasena) {
      setError('Las contraseñas no coinciden')
      return
    }
    setCargando(true)
    try {
      const data = await enviar('/registro', formData)
      navigate('/confirmacion', {
        state: { usuario: formData, respuesta: data },
      })
    } catch (err) {
      setError(err.message || 'Error al registrar la solicitud')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="aq-pagina">
      <Navbar />

      <main className="aq-contenido aq-contenido--medio">
        <div className="aq-encabezado-pagina">
          <h1>Crear mi cuenta</h1>
          <p>Completa tus datos y la administración revisará tu solicitud.</p>
        </div>

        {error && (
          <div className="aq-aviso aq-aviso--error">
            <span className="aq-aviso__punto" />
            <span>{error}</span>
          </div>
        )}

        <section className="aq-tarjeta">
          <form
            className="aq-tarjeta__cuerpo aq-tarjeta__cuerpo--amplio"
            onSubmit={handleSubmit}
          >
            <div className="aq-campo-grupo">
              <label className="aq-etiqueta">Nombre completo</label>
              <input
                type="text"
                className="aq-campo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="aq-rejilla aq-rejilla--2" style={{ gap: '0 16px' }}>
              <div className="aq-campo-grupo">
                <label className="aq-etiqueta">Tipo de documento</label>
                <select
                  className="aq-campo"
                  name="tipo_documento"
                  value={formData.tipo_documento}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="CE">Cédula de extranjería</option>
                </select>
              </div>

              <div className="aq-campo-grupo">
                <label className="aq-etiqueta">Número de documento</label>
                <input
                  type="text"
                  className="aq-campo"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  required
                />
                <p className="aq-ayuda">Solo números, entre 5 y 20 dígitos.</p>
              </div>

              <div className="aq-campo-grupo">
                <label className="aq-etiqueta">Teléfono</label>
                <input
                  type="text"
                  className="aq-campo"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="aq-campo-grupo">
                <label className="aq-etiqueta">Tipo de vinculación</label>
                <select
                  className="aq-campo"
                  name="tipo_usuario"
                  value={formData.tipo_usuario}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="empleado">Empleado</option>
                  <option value="miembro">Miembro</option>
                  <option value="aprendiz">Aprendiz</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>

              <div className="aq-campo-grupo">
                <label className="aq-etiqueta">Contraseña</label>
                <input
                  type="password"
                  className="aq-campo"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                />
                <p className="aq-ayuda">Mínimo 8 caracteres.</p>
              </div>

              <div className="aq-campo-grupo">
                <label className="aq-etiqueta">Confirmar contraseña</label>
                <input
                  type="password"
                  className="aq-campo"
                  name="confirmar_contrasena"
                  value={formData.confirmar_contrasena}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="aq-btn aq-btn--primario aq-btn--bloque"
              disabled={cargando}
            >
              {cargando ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Registro
