import React, { useEffect, useState, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import Navbar from '../../components/Navbar'
import { peticionApi } from '../../services/api'

function Lector() {
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState('')
  const bloqueadoRef = useRef(false)

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    )

    const onScanSuccess = async (decodedText) => {
      if (bloqueadoRef.current) return
      bloqueadoRef.current = true
      setError('')
      try {
        const data = await peticionApi('/lector/escaneo', {
          method: 'POST',
          body: JSON.stringify({ token: decodedText.trim() })
        })
        setResultado(data)
      } catch (err) {
        setError(err.message || 'Código QR inválido o usuario inactivo')
        setResultado(null)
      } finally {
        setTimeout(() => {
          bloqueadoRef.current = false
        }, 2500)
      }
    }

    scanner.render(onScanSuccess, () => {})
    return () => {
      scanner.clear().catch(() => {})
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container mt-4 text-center" style={{ maxWidth: '500px' }}>
        <h4 className="fw-bold mb-3">Escáner de Portería</h4>
        <div id="reader" className="border rounded shadow-sm"></div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {resultado && (
          <div className="alert alert-success mt-3 text-start">
            <strong>Movimiento:</strong> {resultado.tipo_movimiento?.toUpperCase()}{' '}
            <strong>Usuario:</strong> {resultado.nombre}{' '}
            <strong>Hora:</strong> {resultado.fecha_hora}
          </div>
        )}
      </div>
    </div>
  )
}

export default Lector
