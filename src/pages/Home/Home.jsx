import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enviar } from '../../services/api'
import { guardarSesion, rutaSegunRol } from '../../services/sesion'

function Home() {
  const navigate = useNavigate()

  // false = se ve Iniciar sesion | true = se ve Mi codigo QR
  const [esRecuperar, setEsRecuperar] = useState(false)

  // Lo que la persona escribe en Iniciar sesion
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errorLogin, setErrorLogin] = useState('')
  const [cargandoLogin, setCargandoLogin] = useState(false)

  // Lo que la persona escribe en Mi codigo QR
  const [documentoQR, setDocumentoQR] = useState('')
  const [contrasenaQR, setContrasenaQR] = useState('')
  const [errorQR, setErrorQR] = useState('')
  const [cargandoQR, setCargandoQR] = useState(false)

  // Iniciar sesion (administradores y celadores)
  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorLogin('')
    setCargandoLogin(true)
    try {
      const data = await enviar('/login', { usuario, contrasena })
      guardarSesion(data)
      navigate(rutaSegunRol(data.rol))
    } catch (err) {
      setErrorLogin(err.message || 'Usuario o contraseña incorrectos')
    } finally {
      setCargandoLogin(false)
    }
  }

  // Ver o reponer el QR (aprendices, instructores, empleados y miembros)
  const pedirQR = async (ruta) => {
    setErrorQR('')
    setCargandoQR(true)
    try {
      const data = await enviar(ruta, {
        documento: documentoQR,
        contrasena: contrasenaQR,
      })
      navigate('/mi-qr', { state: { qr: data } })
    } catch (err) {
      setErrorQR(err.message || 'No se pudo validar tu cuenta')
    } finally {
      setCargandoQR(false)
    }
  }

  const verMiQR = (e) => {
    e.preventDefault()
    pedirQR('/mi-qr')
  }

  const generarOtro = () => {
    const seguro = window.confirm(
      'Se va a generar un QR nuevo y el anterior dejará de servir. ¿Continuar?'
    )
    if (seguro) pedirQR('/recuperar-qr')
  }

  return (
    <div className="aq-portada">
      <div className="aq-portada__caja">

        {/* ---------- Mitad izquierda: iniciar sesion ---------- */}
        <div className="aq-portada__lado">
          <form className="aq-portada__form" onSubmit={handleLogin}>
            <h1 className="aq-portada__titulo">Iniciar sesión</h1>
            <p className="aq-portada__sub">
              Acceso para administración y portería
            </p>

            {errorLogin && (
              <div className="aq-aviso aq-aviso--error">
                <span className="aq-aviso__punto" />
                <span>{errorLogin}</span>
              </div>
            )}

            <div className="aq-campo-grupo">
              <input
                type="text"
                className="aq-campo"
                placeholder="Número de documento"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>

            <div className="aq-campo-grupo">
              <input
                type="password"
                className="aq-campo"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="aq-btn aq-btn--primario aq-btn--bloque"
              disabled={cargandoLogin}
            >
              {cargandoLogin ? 'Validando...' : 'Entrar'}
            </button>

            <p className="aq-portada__sub" style={{ margin: '22px 0 10px' }}>
              ¿Primera vez aquí?
            </p>

            <button
              type="button"
              className="aq-btn aq-btn--contorno aq-btn--bloque"
              onClick={() => navigate('/registro')}
            >
              Crear mi cuenta
            </button>
          </form>
        </div>

        {/* ---------- Mitad derecha: mi codigo QR ---------- */}
        <div className="aq-portada__lado">
          <form className="aq-portada__form" onSubmit={verMiQR}>
            <h1 className="aq-portada__titulo">Mi código QR</h1>
            <p className="aq-portada__sub">
              Aprendices, instructores, empleados y miembros
            </p>

            {errorQR && (
              <div className="aq-aviso aq-aviso--error">
                <span className="aq-aviso__punto" />
                <span>{errorQR}</span>
              </div>
            )}

            <div className="aq-campo-grupo">
              <input
                type="text"
                className="aq-campo"
                placeholder="Número de documento"
                value={documentoQR}
                onChange={(e) => setDocumentoQR(e.target.value)}
                required
              />
            </div>

            <div className="aq-campo-grupo">
              <input
                type="password"
                className="aq-campo"
                placeholder="Contraseña"
                value={contrasenaQR}
                onChange={(e) => setContrasenaQR(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="aq-btn aq-btn--primario aq-btn--bloque"
              style={{ marginBottom: 10 }}
              disabled={cargandoQR}
            >
              {cargandoQR ? 'Validando...' : 'Ver mi QR'}
            </button>

            <button
              type="button"
              className="aq-btn aq-btn--contorno aq-btn--bloque"
              onClick={generarOtro}
              disabled={cargandoQR}
            >
              Perdí mi QR, generar uno nuevo
            </button>
          </form>
        </div>

        {/* ---------- Panel de color deslizante ---------- */}
        <div
          className={`aq-portada__panel ${
            esRecuperar ? 'aq-portada__panel--izquierda' : ''
          }`}
        >
          <span className="aq-portada__logo">
            <i /><i /><i /><i />
          </span>

          <span className="aq-portada__marca">AccessQR</span>
          <span className="aq-portada__regla" />

          <h3>{esRecuperar ? '¿Ya tienes cuenta?' : '¿Perdiste tu QR?'}</h3>
          <p>
            {esRecuperar
              ? 'Entra con tu usuario de administración o portería.'
              : 'Genera uno nuevo y el anterior deja de servir al instante.'}
          </p>

          <button
            type="button"
            className="aq-btn aq-btn--claro"
            onClick={() => setEsRecuperar(!esRecuperar)}
          >
            {esRecuperar ? 'Iniciar sesión' : 'Mi código QR'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home
