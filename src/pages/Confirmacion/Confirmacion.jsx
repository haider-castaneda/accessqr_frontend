import { useLocation, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { IcoCheck } from '../../components/Iconos'
 
function Confirmacion() {
  const location = useLocation()
  const respuesta = location.state?.respuesta
 
  return (
    <div className="aq-pagina">
      <Navbar />
      <main className="aq-contenido aq-contenido--estrecho">
        <section className="aq-tarjeta aq-aparece">
          <div className="aq-tarjeta__cuerpo aq-tarjeta__cuerpo--amplio"
               style={{ textAlign: 'center' }}>
            <span className="aq-vacio__marco"
                  style={{ margin: '0 auto 16px' }}>
              <IcoCheck />
            </span>
 
            <h1 style={{ fontSize: 23, marginBottom: 8 }}>
              Solicitud enviada
            </h1>
 
            <p style={{ color: 'var(--aq-texto-suave)', marginBottom: 22 }}>
              {respuesta?.mensaje ||
                'Tu registro quedó pendiente de aprobación.'}
            </p>
 
            <div className="aq-aviso aq-aviso--info"
                 style={{ textAlign: 'left' }}>
              <span className="aq-aviso__punto" />
              <span>
                Cuando la administración apruebe tu cuenta, podrás ver tu
                código QR desde la pantalla de inicio con tu documento y
                tu contraseña.
              </span>
            </div>
 
            <Link to="/" className="aq-btn aq-btn--primario aq-btn--bloque">
              Volver al inicio
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
 
export default Confirmacion
