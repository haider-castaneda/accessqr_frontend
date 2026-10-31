import React, { useState } from 'react'
import Navbar from '../../components/Navbar'

function Lector() {
    const [ultimoRegistro] = useState(null)
    const [seccion, setSeccion] = useState('lector')
    const [visitante, setVisitante] = useState({
        nombre: '',
        tipo_documento: '',
        documento: '',
        motivo_visita: ''
    })

    // Datos de prueba: luego vendrán de Flask
    const [pendientes, setPendientes] = useState([
    { id: 1, nombre: 'Carlos Ruiz', documento: '1023456789', tipo: 'Aprendiz', revisado: false },
    { id: 2, nombre: 'Laura Mora', documento: '1098765432', tipo: 'Instructor', revisado: false }
])

    const handleChangeVisitante = (e) => {
        setVisitante({ ...visitante, [e.target.name]: e.target.value })
    }

    const handleSubmitVisitante = (e) => {
        e.preventDefault()
        alert('Visitante registrado correctamente')
        setVisitante({ nombre: '', tipo_documento: '', documento: '', motivo_visita: '' })
        setSeccion('lector')
    }

    const marcarRevisado = (id) => {
    setPendientes(pendientes.map(u => u.id === id ? { ...u, revisado: true } : u))
}

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Punto de acceso — CBA Mosquera</h4>
                    <span className="text-muted">{new Date().toLocaleString()}</span>
                </div>
                {seccion === 'lector' && (
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="card shadow-sm text-center p-4">
                                <h5 className="fw-bold mb-4">Estado del lector</h5>
                                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '120px', height: '120px', backgroundColor: '#e8f5e9' }}>
                                    <span style={{ fontSize: '60px' }}>📷</span>
                                </div>
                                <p className="text-muted">Esperando escaneo...</p>
                                <p className="text-muted small">Acerque el código QR al lector USB</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card shadow-sm p-4">
                                <h5 className="fw-bold mb-3">Último registro</h5>
                                {ultimoRegistro ? (
                                    <div className="alert alert-success">
                                        <p className="fw-bold mb-1">{ultimoRegistro.nombre}</p>
                                        <p className="mb-1 small">{ultimoRegistro.tipo} · Doc: {ultimoRegistro.documento}</p>
                                        <p className="mb-0 small">{ultimoRegistro.movimiento} registrada — {ultimoRegistro.hora}</p>
                                    </div>
                                ) : (
                                    <p className="text-muted">Sin registros aún</p>
                                )}
                                <hr />
                                <h6 className="fw-bold mb-3">Opciones manuales</h6>
                                <button className="btn btn-outline-success w-100 mb-2" onClick={() => setSeccion('visitante')}>
                                    Registrar visitante
                                </button>
                                <button className="btn btn-outline-secondary w-100" onClick={() => setSeccion('regenerar')}>
                                    Revisar pendientes ({pendientes.filter(u => !u.revisado).length})
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {seccion === 'pendientes' && (
                    <div>
                        <button className="btn btn-outline-secondary mb-3" onClick={() => setSeccion('lector')}>← Volver</button>
                        <h5 className="fw-bold mb-3">Usuarios pendientes de revisión</h5>
                        <table className="table table-bordered">
                            <thead className="table-success">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Documento</th>
                                    <th>Tipo</th>
                                    <th>Revisión</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendientes.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.nombre}</td>
                                        <td>{u.documento}</td>
                                        <td>{u.tipo}</td>
                                        <td>
                                            {u.revisado ? (
                                                <span className="badge bg-success">Revisado</span>
                                            ) : (
                                                <button className="btn btn-sm btn-outline-success" onClick={() => marcarRevisado(u.id)}>
                                                    Marcar como revisado
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {seccion === 'visitante' && (
                    <div style={{ maxWidth: '500px' }}>
                        <button className="btn btn-outline-secondary mb-3" onClick={() => setSeccion('lector')}>← Volver</button>
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">Registrar visitante</h5>
                                <form onSubmit={handleSubmitVisitante}>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre completo</label>
                                        <input type="text" className="form-control" name="nombre" value={visitante.nombre} onChange={handleChangeVisitante} required />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Tipo de documento</label>
                                            <select className="form-select" name="tipo_documento" value={visitante.tipo_documento} onChange={handleChangeVisitante} required>
                                                <option value="">Seleccionar...</option>
                                                <option value="CC">Cédula de ciudadanía</option>
                                                <option value="TI">Tarjeta de identidad</option>
                                                <option value="CE">Cédula de extranjería</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Número de documento</label>
                                            <input type="text" className="form-control" name="documento" value={visitante.documento} onChange={handleChangeVisitante} required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Motivo de visita</label>
                                        <textarea className="form-control" name="motivo_visita" value={visitante.motivo_visita} onChange={handleChangeVisitante} rows="3" required />
                                    </div>
                                    <button type="submit" className="btn btn-success w-100">Registrar entrada</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {seccion === 'regenerar' && (
                    <div style={{ maxWidth: '500px' }}>
                        <button className="btn btn-outline-secondary mb-3" onClick={() => setSeccion('lector')}>← Volver</button>
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">Regenerar QR por pérdida</h5>
                                <div className="mb-3">
                                    <label className="form-label">Número de documento del usuario</label>
                                    <input type="text" className="form-control" placeholder="Ingresa el documento" />
                                </div>
                                <button className="btn btn-success w-100">Buscar y regenerar QR</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Lector