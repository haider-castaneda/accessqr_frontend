import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function RecuperarQR() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        documento: '',
        contrasena: '',
        confirmar_contrasena: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/mi-qr')
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{ maxWidth: '500px' }}>
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h3 className="fw-bold mb-1">Recuperar código QR</h3>
                        <p className="text-success mb-4">Ingresa tu documento y contraseña para generar un nuevo QR</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Número de documento</label>
                                <input type="text" className="form-control" name="documento" value={formData.documento} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nueva contraseña</label>
                                <input type="password" className="form-control" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirmar contraseña</label>
                                <input type="password" className="form-control" name="confirmar_contrasena" value={formData.confirmar_contrasena} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Generar nuevo QR</button>
                        </form>
                        <div className="alert alert-warning mt-3 mb-0">
                            Al generar un nuevo QR, el anterior quedará inválido automáticamente.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecuperarQR