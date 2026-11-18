import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { peticionApi } from '../../services/api'

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ usuario: '', contrasena: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await peticionApi('/login', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            localStorage.setItem('token', data.token)
            localStorage.setItem('rol', data.rol)
            localStorage.setItem('nombre', data.nombre)

            if (data.rol === 'celador') navigate('/lector')
            else if (data.rol === 'administrador') navigate('/panel-admin')
            else navigate('/')
        } catch (err) {
            setError(err.message || 'Usuario o contraseña incorrectos')
        } finally {
            setLoading(false)
        }
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
                        {error && <div className="alert alert-danger py-2 small">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <input type="text" className="form-control" name="usuario" value={formData.usuario} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-success w-100" disabled={loading}>
                                {loading ? 'Validando...' : 'Ingresar al panel'}
                            </button>
                        </form>
                        <p className="text-muted text-center small mt-3">SENAcceso · CBA Mosquera · 2026</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
