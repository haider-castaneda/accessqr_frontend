import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    // false = se ve Iniciar sesión | true = se ve Recuperar QR
    const [esRecuperar, setEsRecuperar] = useState(false)

    // Lo que la persona escribe en Iniciar sesión
    const [usuario, setUsuario] = useState('')
    const [contrasena, setContrasena] = useState('')

    // Lo que la persona escribe en Recuperar QR
    const [usuarioQR, setUsuarioQR] = useState('')
    const [contrasenaQR, setContrasenaQR] = useState('')

    // true cuando la pantalla es de celular (menos de 768 px)
    const [esMovil, setEsMovil] = useState(window.innerWidth < 768)

    useEffect(() => {
        const detectar = () => setEsMovil(window.innerWidth < 768)
        window.addEventListener('resize', detectar)
        return () => window.removeEventListener('resize', detectar)
    }, [])

    // Zona de Iniciar sesión: izquierda en PC, arriba en celular
    const zonaLogin = esMovil
        ? { top: 0, left: 0, width: '100%', height: '50%' }
        : { top: 0, left: 0, width: '50%', height: '100%' }

    // Zona de Recuperar QR: derecha en PC, abajo en celular
    const zonaRecuperar = esMovil
        ? { bottom: 0, left: 0, width: '100%', height: '50%' }
        : { top: 0, right: 0, width: '50%', height: '100%' }

    // Panel de color: se mueve de lado en PC y de arriba a abajo en celular
    const zonaPanel = esMovil
        ? {
            top: '50%',
            left: 0,
            width: '100%',
            height: '50%',
            transform: esRecuperar ? 'translateY(-100%)' : 'translateY(0)',
        }
        : {
            top: 0,
            left: '50%',
            width: '50%',
            height: '100%',
            transform: esRecuperar ? 'translateX(-100%)' : 'translateX(0)',
        }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 py-5 px-3">
            {/* Caja blanca con esquinas redondeadas */}
            <div
                className="position-relative bg-white overflow-hidden shadow"
                style={{
                    width: '1100px',
                    maxWidth: '100%',
                    minHeight: esMovil ? '800px' : '650px',
                    borderRadius: '30px',
                }}
            >
                {/* Zona de Iniciar sesión + Registrarse */}
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={zonaLogin}
                >
                    <form
                        className="w-100 px-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            console.log('Iniciar sesión con:', usuario)
                        }}
                    >
                        <h2 className="fw-bold text-center text-black mb-2">Iniciar sesión</h2>
                        <p className="text-center text-muted small mb-4">
                            Acceso exclusivo para administradores
                        </p>

                        <input
                            type="text"
                            className="form-control bg-light border-0 py-2 mb-3"
                            placeholder="Usuario o identificación"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            className="form-control bg-light border-0 py-2 mb-4"
                            placeholder="Contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />  

                        <button
                            type="button"
                            className="btn btn-primary w-100 fw-bold py-2"
                            onClick={() => navigate('/panel-admin')}
                        >
                            INICIAR SESION
                        </button>

                        <p className="text-center text-muted small mt-4 mb-2">
                            ¿Primera vez aquí?
                        </p>
                        <button
                            type="button"
                            className="btn btn-outline-primary w-100 fw-bold py-2"
                            onClick={() => navigate('/registro')}
                        >
                            REGISTRARSE
                        </button>
                    </form>
                </div>

                {/* Zona de Recuperar QR: usuario, contraseña y botón CONTINUAR */}
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={zonaRecuperar}
                >
                    <form
                        className="w-100 px-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            // Al enviar los datos, recién ahí cambia de pantalla
                            navigate('/recuperar-qr')
                        }}
                    >
                        <h2 className="fw-bold text-center text-black mb-4">Recuperar QR</h2>

                        <input
                            type="text"
                            className="form-control bg-light border-0 py-2 mb-3"
                            placeholder="Usuario o identificación"
                            value={usuarioQR}
                            onChange={(e) => setUsuarioQR(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            className="form-control bg-light border-0 py-2 mb-4"
                            placeholder="Contraseña"
                            value={contrasenaQR}
                            onChange={(e) => setContrasenaQR(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="btn btn-primary w-100 fw-bold py-2"
                            onClick={() => navigate('/mi-qr')}
                        >
                            CONTINUAR
                        </button>
                    </form>
                </div>

                {/* Panel de color deslizante */}
                <div
                    className="position-absolute d-flex flex-column align-items-center justify-content-center text-center text-white p-4"
                    style={{
                        ...zonaPanel,
                        backgroundColor: '#0d6efd',
                        transition: 'transform 0.6s ease-in-out',
                    }}
                >
                    <h2 className="fw-bold mb-3">
                        {esRecuperar ? '¿Ya tienes cuenta?' : '¿Perdiste tu QR?'}
                    </h2>
                    <p className="mb-4">
                        {esRecuperar
                            ? 'Inicia sesión o regístrate'
                            : 'Genera un QR nuevo para ingresar'}
                    </p>
                    <button
                        className="btn btn-outline-light px-4 fw-bold"
                        onClick={() => setEsRecuperar(!esRecuperar)}
                    >
                        {esRecuperar ? 'ACCEDER' : 'RECUPERAR QR'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home