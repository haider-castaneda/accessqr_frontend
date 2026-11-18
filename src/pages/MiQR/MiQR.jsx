import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useLocation, Link } from 'react-router-dom'
import { peticionApi } from '../../services/api'

function MiQR() {
  const location = useLocation()
  const [datosQR, setDatosQR] = useState(location.state?.usuarioQR || null)
  const [cargando, setCargando] = useState(!location.state?.usuarioQR)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarDatosQR = async () => {
      try {
        const respuesta = await peticionApi('/mi-qr')
        setDatosQR((prev) => ({ ...(prev || {}), ...respuesta }))
      } catch (err) {
        if (!datosQR) setError(err.message || 'No hay sesión o datos de QR activos.')
      } finally {
        setCargando(false)
      }
    }
    cargarDatosQR()
  }, [])

  const descargarQR = () => {
    const imagenSrc = datosQR?.qr_imagen || datosQR?.qr_base64 || datosQR?.qr_url
    if (!imagenSrc) return
    const enlace = document.createElement('a')
    enlace.href =
      imagenSrc.startsWith('data:') || imagenSrc.startsWith('http')
        ? imagenSrc
        : `data:image/png;base64,${imagenSrc}`
    enlace.download = `QR_${datosQR?.documento || 'AccessQR'}.png`
    enlace.click()
  }

  if (cargando)
    return (
      <div>
        <Navbar />
        <div className="container mt-5 text-center">
          <p className="text-muted">Cargando tu código QR...</p>
        </div>
      </div>
    )

  if (!datosQR)
    return (
      <div>
        <Navbar />
        <div className="container mt-5 text-center">
          <p>{error || 'No hay sesión activa.'}</p>
          <Link to="/" className="btn btn-primary mt-2">Volver al inicio</Link>
        </div>
      </div>
    )

  const imagenQR = datosQR.qr_imagen || datosQR.qr_base64 || datosQR.qr_url

  return (
    <div>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: '500px' }}>
        <div className="card shadow-sm text-center">
          <div className="card-body p-5">
            <span className="badge bg-success mb-3">
              {datosQR.estado ? `Cuenta ${datosQR.estado}` : 'Cuenta activa'}
            </span>
            <h4 className="fw-bold">{datosQR.nombre || 'Usuario AccessQR'}</h4>
            <p className="text-muted text-capitalize">
              {datosQR.rol || 'Aprendiz'} CBA Mosquera
            </p>
            <div className="border rounded p-4 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
              {imagenQR ? (
                <img
                  src={
                    imagenQR.startsWith('data:') || imagenQR.startsWith('http')
                      ? imagenQR
                      : `data:image/png;base64,${imagenQR}`
                  }
                  alt="QR"
                  className="img-fluid"
                  style={{ maxWidth: '220px' }}
                />
              ) : (
                <div>
                  <p className="fw-bold mb-1">Token QR:</p>
                  <code className="text-break">{datosQR.token_qr || datosQR.codigo_qr}</code>
                </div>
              )}
            </div>
            <p className="text-muted small mb-4">
              Código QR personal e intransferible para ingreso en portería.
            </p>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={descargarQR}
              disabled={!imagenQR}
            >
              Descargar QR
            </button>
            <p className="text-muted small mt-3">
              Documento: {datosQR.documento || datosQR.identificacion}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiQR
