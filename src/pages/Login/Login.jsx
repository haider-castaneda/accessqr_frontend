import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        usuario: '',
        contrasena: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/panel-admin')
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <span style={{ fontSize: '50px' }}>🔒</span>
                    <h3 className="fw-bold mt-2">Acceso administrativo</h3>
                    <p className="text-muted">Solo personal autorizado del CBA Mosquera</p>
                </div>
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <input type="text" className="form-control" name="usuario" value={formData.usuario} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Ingresar al panel</button>
                        </form>
                        <p className="text-muted text-center small mt-3">SENAcceso · CBA Mosquera · 2025</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login