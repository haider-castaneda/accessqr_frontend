import React from 'react'
import Navbar from '../../components/Navbar'

function MiQR() {
    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{ maxWidth: '500px' }}>
                <div className="card shadow-sm text-center">
                    <div className="card-body p-5">
                        <span className="badge bg-success mb-3">Cuenta activa</span>
                        <h4 className="fw-bold">Juan Pérez García</h4>
                        <p className="text-muted">Aprendiz · CBA Mosquera</p>
                        <div className="border rounded p-4 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <p className="text-muted">[Aquí aparecerá el QR cuando el backend esté listo]</p>
                        </div>
                        <p className="text-muted small mb-4">Este es tu código QR personal e intransferible. Guárdalo en tu celular para usarlo en la entrada.</p>
                        <button className="btn btn-success w-100">Descargar QR</button>
                        <p className="text-muted small mt-3">Documento: 1234567890</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiQR