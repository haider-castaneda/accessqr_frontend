import { useState, useEffect } from 'react'

function Home() {
    // false = se ve Iniciar sesión | true = se ve Registro
    const [esRegistro, setEsRegistro] = useState(false)

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

    // Zona de Registro: derecha en PC, abajo en celular
    const zonaRegistro = esMovil
        ? { bottom: 0, left: 0, width: '100%', height: '50%' }
        : { top: 0, right: 0, width: '50%', height: '100%' }

    // Panel rojo: se mueve de lado en PC y de arriba a abajo en celular
    const zonaPanel = esMovil
        ? {
            top: '50%',
            left: 0,
            width: '100%',
            height: '50%',
            transform: esRegistro ? 'translateY(-100%)' : 'translateY(0)',
        }
        : {
            top: 0,
            left: '50%',
            width: '50%',
            height: '100%',
            transform: esRegistro ? 'translateX(-100%)' : 'translateX(0)',
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
                {/* Zona de Iniciar sesión */}
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={zonaLogin}
                >
                    <p>Aquí irá Iniciar sesión</p>
                </div>

                {/* Zona de Registro */}
                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={zonaRegistro}
                >
                    <p>Aquí irá Registro</p>
                </div>

                {/* Panel rojo deslizante */}
                <div
                    className="position-absolute d-flex flex-column align-items-center justify-content-center text-center text-white p-4"
                    style={{
                        ...zonaPanel,
                        backgroundColor: '#0d6efd',
                        transition: 'transform 0.6s ease-in-out',
                    }}
                >
                    <h2 className="fw-bold mb-3">
                        {esRegistro ? 'Bienvenido' : '¿Primera vez aquí?'}
                    </h2>
                    <p className="mb-4">
                        {esRegistro
                            ? 'Si ya tienes cuenta, inicia sesión'
                            : 'Regístrate y obtén tu QR de acceso'}
                    </p>
                    <button
                        className="btn btn-outline-light px-4 fw-bold"
                        onClick={() => setEsRegistro(!esRegistro)}
                    >
                        {esRegistro ? 'INICIAR SESIÓN' : 'REGISTRARSE'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home