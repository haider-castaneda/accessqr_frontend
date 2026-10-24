import React, { useState } from 'react'
import Navbar from '../../components/Navbar'

function Registro() {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo_documento: '',
        documento: '',
        telefono: '',
        tipo_usuario: '',
        contrasena: '',
        confirmar_contrasena: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div>
        <Navbar />
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="fw-bold mb-1 text-black">Crear cuenta</h2>
            <p className="text-success mb-4">Completa tus datos para obtener tu código QR de acceso</p>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                <label className="form-label">Tipo de documento</label>
                <select className="form-select" name="tipo_documento" value={formData.tipo_documento} onChange={handleChange} required>
                    <option value="">Seleccionar...</option>
                    <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
                    <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                </select>
                </div>
                <div className="col-md-6 mb-3">
                <label className="form-label">Número de documento</label>
                <input type="text" className="form-control" name="documento" value={formData.documento} onChange={handleChange} required />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                <label className="form-label">Teléfono</label>
                <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                <label className="form-label">Tipo de usuario</label>
                <select className="form-select" name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange} required>
                    <option value="">Seleccionar...</option>
                    <option value="aprendiz">Aprendiz</option>
                    <option value="instructor">Instructor</option>
                </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input type="password" className="form-control" name="confirmar_contrasena" value={formData.confirmar_contrasena} onChange={handleChange} required />
                </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-2">Registrarse</button>
            </form>
        </div>
        </div>
    )
}

export default Registro