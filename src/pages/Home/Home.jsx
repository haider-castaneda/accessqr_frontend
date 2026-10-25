import { useNavigate } from 'react-router-dom'
import React from 'react'
import Navbar from '../../components/Navbar'

function Home() {
    const navigate = useNavigate()
    return (
        <div>
        <Navbar />
        <div className="container mt-5">
            <div className="text-center mb-5">
            <h1 className="fw-bold text-dark">Control de acceso institucional</h1>
            <p className="text-success">Sistema de registro de ingreso y salida</p>
            </div>
            <div className="row justify-content-center g-4">
            <div className="col-md-4">
                <div className="card h-100 text-center shadow-sm">
                <div className="card-body p-4">
                    <h5 className="card-title fw-bold">Registrarse</h5>
                    <p className="card-text text-muted">Regístrate por primera vez para obtener tu QR</p>
                    <button className="btn btn-success" onClick={() => navigate('/registro')}>Ir a registro</button>
                </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card h-100 text-center shadow-sm">
                <div className="card-body p-4">
                    <h5 className="card-title fw-bold">Recuperar QR</h5>
                    <p className="card-text text-muted">Genera un QR nuevo</p>
                    <button className="btn btn-success" onClick={() => navigate('/recuperar-qr')}>Recuperar</button>
                </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card h-100 text-center shadow-sm">
                <div className="card-body p-4">
                    <h5 className="card-title fw-bold">Administrador</h5>
                    <p className="card-text text-muted">Acceso exclusivo para personal autorizado</p>
                    <button className="btn btn-success">Ingresar</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Home