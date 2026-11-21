import { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { enviar } from '../../services/api'
import { soloHora } from '../../services/formato'

function Escaner() {
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState('')
  const ocupado = useRef(false)

  useEffect(() => {
    let cancelado = false
    let scanner = null

    const alLeer = async (texto) => {
      if (ocupado.current) return
      ocupado.current = true
      setError('')
      try {
        const data = await enviar('/lector/escaneo', { token: texto.trim() })
        setResultado(data)
      } catch (err) {
        setError(err.message)
        setResultado(null)
      } finally {
        setTimeout(() => {
          ocupado.current = false
        }, 3000)
      }
    }

    const temporizador = setTimeout(() => {
      if (cancelado) return
      const contenedor = document.getElementById('reader')
      if (contenedor) contenedor.innerHTML = ''
      scanner = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      )
      scanner.render(alLeer, () => {})
    }, 150)

    return () => {
      cancelado = true
      clearTimeout(temporizador)
      if (scanner) scanner.clear().catch(() => {})
    }
  }, [])

  const esEntrada = resultado?.tipo_movimiento === 'entrada'

  return (
    <div>
      <div id="reader" className="border rounded shadow-sm bg-white" />

      {error && (
        <div className="alert alert-danger mt-3 text-center fw-bold">{error}</div>
      )}

      {resultado && (
        <div
          className={`alert mt-3 text-center ${esEntrada ? 'alert-success' : 'alert-warning'}`}
        >
          <div className="display-6 fw-bold text-uppercase mb-2">
            {resultado.tipo_movimiento}
          </div>
          <div className="fs-5 fw-semibold">{resultado.nombre}</div>
          <div className="text-muted">
            {resultado.documento}
            {' · '}
            <span className="text-capitalize">{resultado.tipo_usuario}</span>
          </div>
          <div className="mt-2">{soloHora(resultado.fecha_hora)}</div>
        </div>
      )}

      <p className="text-muted small mt-3 text-center">
        Apunta la cámara al código. El sistema alterna entrada y salida solo.
      </p>
    </div>
  )
}

export default Escaner