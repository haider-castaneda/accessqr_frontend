import React from 'react'
import Navbar from '../../components/Navbar'

function Confirmacion() {
    return (
        <div>
        <Navbar />
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <div className="card text-center shadow-sm">
            <div className="card-body p-5">
                <div className="mb-4">
                <span style={{ fontSize: '60px' }}>⏳</span>
                </div>
                <h3 className="fw-bold mb-3">Registro recibido</h3>
                <p className="text-muted mb-4">
                Tu solicitud fue enviada correctamente. Un administrador del CBA Mosquera 
                revisará tus datos y te contactará cuando tu cuenta sea activada.
                </p>
                <div className="alert alert-warning">
                <strong>Cuenta pendiente de aprobación</strong>
                <p className="mb-0 mt-2">Cuando tu cuenta sea aprobada podrás volver aquí para descargar tu código QR de acceso. Guarda tu número de documento y contraseña.</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Confirmacion