import { useState } from 'react'
import { enviar } from '../../services/api'
 
function ReponerQR() {
  const [documento, setDocumento] = useState('')
  const [error, setError] = useState('')
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(false)
 
  const reponer = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      const respuesta = await enviar('/qr/regenerar', { documento })
      setDatos(respuesta)
      setDocumento('')
    } catch (err) {
      setError(err.message)
      setDatos(null)
    } finally {
      setCargando(false)
    }
  }
 
  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h6 className="fw-bold mb-3">Reponer el QR de un usuario</h6>
 
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
 
        <form onSubmit={reponer} className="mb-3">
          <label className="form-label">Número de documento</label>
          <input
            type="text"
            className="form-control mb-3"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100" disabled={cargando}>
            {cargando ? 'Generando...' : 'Generar QR nuevo'}
          </button>
        </form>
 
        {datos && (
          <div className="text-center border rounded p-3 bg-light">
            <p className="fw-bold mb-2">{datos.nombre}</p>
            <img
              src={datos.qr}
              alt="QR nuevo"
              className="img-fluid"
              style={{ maxWidth: '220px' }}
            />
            <p className="text-muted small mt-2 mb-0">
              Pídele que le tome una foto. El código anterior ya no sirve.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
 
export default ReponerQR