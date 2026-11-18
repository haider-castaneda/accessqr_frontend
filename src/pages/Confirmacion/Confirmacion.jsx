import React from 'react'
import Navbar from '../../components/Navbar'
import { useLocation, Link } from 'react-router-dom'

function Confirmacion() {
  const location = useLocation()
  const respuesta = location.state?.respuesta

  return (
    <div>
      <Navbar />
      <div className="container mt-5 text-center" style={{ maxWidth: '500px' }}>
        <div className="card shadow-sm p-4">
          <h3 className="fw-bold text-success mb-3">¡Solicitud Enviada!</h3>
          <p className="text-muted">
            {respuesta?.mensaje || 'Tu registro ha sido recibido y se encuentra pendiente de aprobación por el administrador.'}
          </p>
          <Link to="/" className="btn btn-primary w-100 mt-3">Volver al inicio</Link>
        </div>
      </div>
    </div>
  )
}

export default Confirmacion
