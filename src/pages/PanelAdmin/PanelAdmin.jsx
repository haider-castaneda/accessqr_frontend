import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { peticionApi } from '../../services/api'

function PanelAdmin() {
  const [indicadores, setIndicadores] = useState({})
  const [pendientes, setPendientes] = useState([])
  const [movimientos, setMovimientos] = useState([])
  const [error, setError] = useState('')

  const cargarDatos = async () => {
    try {
      const [ind, pend, mov] = await Promise.all([
        peticionApi('/admin/indicadores'),
        peticionApi('/admin/pendientes'),
        peticionApi('/admin/movimientos')
      ])
      setIndicadores(ind)
      setPendientes(pend)
      setMovimientos(mov)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const cambiarEstado = async (id, estado) => {
    try {
      await peticionApi(`/admin/usuarios/${id}/estado`, {
        method: 'PUT',
        body: JSON.stringify({ estado })
      })
      cargarDatos()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h3 className="fw-bold mb-4">Panel de Administración</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center">
              <h5>Total Usuarios</h5>
              <h3>{indicadores.total_usuarios || 0}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center">
              <h5>Pendientes</h5>
              <h3>{pendientes.length}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 text-center">
              <h5>Ingresos Hoy</h5>
              <h3>{indicadores.ingresos_hoy || 0}</h3>
            </div>
          </div>
        </div>

        <h5 className="fw-bold mb-3">Solicitudes Pendientes</h5>
        <div className="table-responsive bg-white shadow-sm rounded p-3 mb-5">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pendientes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No hay solicitudes pendientes
                  </td>
                </tr>
              ) : (
                pendientes.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.documento}</td>
                    <td className="text-capitalize">{u.tipo_usuario}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => cambiarEstado(u.id, 'aprobado')}
                      >
                        Aprobar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => cambiarEstado(u.id, 'rechazado')}
                      >
                        Rechazar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin