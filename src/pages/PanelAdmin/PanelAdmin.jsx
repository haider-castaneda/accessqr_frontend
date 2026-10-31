import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function PanelAdmin() {
    const navigate = useNavigate()
    const [seccion, setSeccion] = useState('panel')
    // Datos de prueba: luego vendrán de Flask
    const [pendientes, setPendientes] = useState([
        { id: 1, nombre: 'Carlos Ruiz', documento: '1023456789', tipo: 'Aprendiz', revisado: true },
        { id: 2, nombre: 'Laura Mora', documento: '1098765432', tipo: 'Instructor', revisado: false }
    ])

    const quitarPendiente = (id) => {
        setPendientes(pendientes.filter(u => u.id !== id))
    }

    const botonMenu = (clave, texto) => (
        <li className="nav-item mb-2">
            <button className={`btn w-100 text-start ${seccion === clave ? 'btn-light' : 'btn-outline-light'}`} onClick={() => setSeccion(clave)}>{texto}</button>
        </li>
    )

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 min-vh-100 p-0" style={{ backgroundColor: '#2d6a2d' }}>
                        <div className="p-3">
                            <p className="text-white fw-bold mb-4">SENAcceso</p>
                            <ul className="nav flex-column">
                                {botonMenu('panel', 'Panel')}
                                {botonMenu('usuarios', 'Usuarios')}
                                {botonMenu('historial', 'Historial')}
                                {botonMenu('reportes', 'Reportes')}
                                <li className="nav-item mt-4 mb-2">
                                    <button className="btn btn-outline-light w-100 text-start" onClick={() => navigate('/lector')}>Pantalla lector</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light w-100 text-start" onClick={() => navigate('/')}>Salir</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-10 p-4">
                        {seccion === 'panel' && (
                            <div>
                                <h4 className="fw-bold mb-4">Panel principal</h4>
                                <div className="row g-3 mb-4">
                                    <div className="col-md-4">
                                        <div className="card text-center shadow-sm">
                                            <div className="card-body">
                                                <h6 className="text-muted">Dentro ahora</h6>
                                                <h2 className="fw-bold text-success">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card text-center shadow-sm">
                                            <div className="card-body">
                                                <h6 className="text-muted">Pendientes</h6>
                                                <h2 className="fw-bold text-warning">{pendientes.length}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card text-center shadow-sm">
                                            <div className="card-body">
                                                <h6 className="text-muted">Movimientos hoy</h6>
                                                <h2 className="fw-bold">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="fw-bold mb-3">Usuarios pendientes de aprobación</h5>
                                <table className="table table-bordered">
                                    <thead className="table-success">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Documento</th>
                                            <th>Tipo</th>
                                            <th>Revisado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendientes.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center text-muted">No hay usuarios pendientes</td>
                                            </tr>
                                        ) : (
                                            pendientes.map(u => (
                                                <tr key={u.id}>
                                                    <td>{u.nombre}</td>
                                                    <td>{u.documento}</td>
                                                    <td>{u.tipo}</td>
                                                    <td>
                                                        <span className={`badge ${u.revisado ? 'bg-success' : 'bg-secondary'}`}>
                                                            {u.revisado ? 'Sí' : 'No'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2" disabled={!u.revisado} onClick={() => quitarPendiente(u.id)}>
                                                            Aprobar
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => quitarPendiente(u.id)}>
                                                            Rechazar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>

                                <h5 className="fw-bold mb-3 mt-4">Últimos movimientos</h5>
                                <table className="table table-bordered">
                                    <thead className="table-success">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Documento</th>
                                            <th>Hora</th>
                                            <th>Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="4" className="text-center text-muted">No hay movimientos registrados</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {seccion === 'usuarios' && (
                            <div>
                                <h4 className="fw-bold mb-4">Gestión de usuarios</h4>
                                <p className="text-muted">Aquí aparecerán todos los usuarios del sistema cuando el backend esté listo.</p>
                            </div>
                        )}
                        {seccion === 'historial' && (
                            <div>
                                <h4 className="fw-bold mb-4">Historial de movimientos</h4>
                                <p className="text-muted">Aquí aparecerá el historial completo cuando el backend esté listo.</p>
                            </div>
                        )}
                        {seccion === 'reportes' && (
                            <div>
                                <h4 className="fw-bold mb-4">Reportes</h4>
                                <p className="text-muted">Aquí se generarán los reportes cuando el backend esté listo.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PanelAdmin