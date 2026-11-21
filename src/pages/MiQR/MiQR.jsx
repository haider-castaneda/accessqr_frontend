import { useLocation, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
 
function MiQR() {
  const location = useLocation()
  const datos = location.state?.qr
 
  if (!datos?.qr) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 text-center" style={{ maxWidth: '500px' }}>
          <div className="card shadow-sm p-4">
            <h5 className="fw-bold mb-3">No hay ningún QR para mostrar</h5>
            <p className="text-muted">
              Por seguridad, el código no se guarda en el navegador. Entra con tu
              documento y tu contraseña para verlo.
            </p>
            <Link to="/" className="btn btn-primary mt-2">Ir al inicio</Link>
          </div>
        </div>
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
    <div>
      <Navbar />
      <div className="container mt-4 mb-5" style={{ maxWidth: '480px' }}>
        <div className="card shadow-sm text-center">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-1">{datos.nombre}</h4>
            <p className="text-muted small mb-4">Tu código de acceso</p>
 
            <div className="border rounded p-3 mb-4 bg-light">
              <img
                src={datos.qr}
                alt="Código QR de acceso"
                className="img-fluid"
                style={{ maxWidth: '240px' }}
              />
            </div>
 
            <button className="btn btn-primary w-100 mb-3" onClick={descargar}>
              Descargar imagen
            </button>
 
            <p className="text-muted small mb-0">
              Es personal e intransferible. Guárdalo en tu celular: en portería
              basta con mostrarlo en la pantalla.
            </p>
          </div>
        </div>
 
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-link">Volver al inicio</Link>
        </div>
      </div>
    </div>
  )
}
 
export default MiQR