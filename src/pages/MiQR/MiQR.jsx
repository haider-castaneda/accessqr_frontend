import { useLocation, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
 
function MiQR() {
  const location = useLocation()
  const datos = location.state?.qr
 
  if (!datos?.qr) {
    return (
      <div className="aq-pagina">
        <Navbar />
        <main className="aq-contenido aq-contenido--estrecho">
          <section className="aq-tarjeta">
            <div className="aq-tarjeta__cuerpo aq-tarjeta__cuerpo--amplio"
                 style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: 20, marginBottom: 10 }}>
                No hay ningún QR para mostrar
              </h1>
              <p style={{ color: 'var(--aq-texto-suave)', marginBottom: 20 }}>
                Por seguridad el código no se guarda en el navegador. Entra
                con tu documento y tu contraseña para verlo.
              </p>
              <Link to="/" className="aq-btn aq-btn--primario">
                Ir al inicio
              </Link>
            </div>
          </section>
        </main>
      </div>
    )
  }
 
  const descargar = () => {
    const enlace = document.createElement('a')
    enlace.href = datos.qr
    enlace.download = `QR_${(datos.nombre || 'AccessQR').replace(/\s+/g, '_')}.png`
    document.body.appendChild(enlace)
    enlace.click()
    enlace.remove()
  }
 
  return (
    <div className="aq-pagina">
      <Navbar />
      <main className="aq-contenido aq-contenido--estrecho">
        <div className="aq-credencial aq-aparece">
 
          <div className="aq-credencial__tapa">
            <span
              className="aq-insignia"
              style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}
            >
              Cuenta activa
            </span>
            <h1 className="aq-credencial__nombre">{datos.nombre}</h1>
            <span className="aq-credencial__rol">Código de acceso</span>
          </div>
 
          <div className="aq-credencial__muesca">
            <span className="aq-credencial__linea" />
          </div>
 
          <div className="aq-credencial__qr">
            <img src={datos.qr} alt="Código QR de acceso" />
          </div>
 
          <div className="aq-credencial__pie">
            <button
              className="aq-btn aq-btn--primario aq-btn--bloque"
              onClick={descargar}
            >
              Descargar imagen
            </button>
            <p className="aq-credencial__nota">
              Personal e intransferible. Guárdalo en tu celular: en portería
              basta con mostrarlo en la pantalla.
            </p>
          </div>
 
        </div>
 
        <p style={{ textAlign: 'center', marginTop: 18 }}>
          <Link to="/">Volver al inicio</Link>
        </p>
      </main>
    </div>
  )
}
 
export default MiQR
