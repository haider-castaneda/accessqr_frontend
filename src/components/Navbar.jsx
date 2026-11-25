import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cerrarSesion, hayToken, nombreActual, rolActual } from '../services/sesion'
 
// Las unicas pantallas donde tiene sentido mostrar la sesion.
const RUTAS_PRIVADAS = ['/panel-admin', '/lector']
 
function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
 
  // No basta con que haya token: ademas hay que estar en zona privada.
  const mostrarSesion = RUTAS_PRIVADAS.includes(pathname) && hayToken()
 
  const salir = () => {
    cerrarSesion()
    navigate('/')
  }
 
  return (
    <header className="aq-barra">
      <div className="aq-barra__interior">
        <Link to="/" className="aq-marca">
          <span className="aq-marca__icono">
            <i /><i /><i /><i />
          </span>
          AccessQR
        </Link>
 
        {mostrarSesion ? (
          <div className="aq-sesion">
            <span className="aq-sesion__quien">
              <span className="aq-sesion__nombre">{nombreActual()}</span>
              <span className="aq-sesion__rol">{rolActual()}</span>
            </span>
            <button
              className="aq-btn aq-btn--claro aq-btn--pequeno"
              onClick={salir}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <span className="aq-barra__lema">Control de acceso</span>
        )}
      </div>
    </header>
  )
}
 
export default Navbar

