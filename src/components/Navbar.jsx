import { Link, useNavigate } from 'react-router-dom'
import { cerrarSesion, hayToken, nombreActual, rolActual } from '../services/sesion'
 
function Navbar() {
  const navigate = useNavigate()
  const conSesion = hayToken()
 
  const salir = () => {
    cerrarSesion()
    navigate('/')
  }
 
  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: '#0d6efd' }}>
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          AccessQR
        </Link>
 
        {conSesion ? (
          <div className="d-flex align-items-center gap-3">
            <span className="text-white small d-none d-sm-inline">
              {nombreActual()}
              {' · '}
              <span className="text-capitalize">{rolActual()}</span>
            </span>
            <button className="btn btn-sm btn-outline-light" onClick={salir}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <span className="text-white small">Control de acceso</span>
        )}
      </div>
    </nav>
  )
}
 
export default Navbar
