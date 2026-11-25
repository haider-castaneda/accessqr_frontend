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

    // El modo estricto de React monta, desmonta y vuelve a montar enseguida.
    // Con esta espera, el primer montaje se cancela antes de encender la
    // camara y solo queda un escaner.
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
      <div id="reader" className="aq-marco" />

      {error && (
        <div className="aq-aviso aq-aviso--error" style={{ marginTop: 16 }}>
          <span className="aq-aviso__punto" />
          <span>{error}</span>
        </div>
      )}

      {resultado && (
        <div
          className={`aq-sello ${
            esEntrada ? 'aq-sello--entrada' : 'aq-sello--salida'
          }`}
          style={{ marginTop: 16 }}
        >
          <div className="aq-sello__tipo">{resultado.tipo_movimiento}</div>
          <div className="aq-sello__nombre">{resultado.nombre}</div>
          <div className="aq-sello__datos">
            {resultado.documento}
            {' · '}
            <span style={{ textTransform: 'capitalize' }}>
              {resultado.tipo_usuario}
            </span>
          </div>
          <span className="aq-sello__hora">{soloHora(resultado.fecha_hora)}</span>
        </div>
      )}

      <p
        style={{
          textAlign: 'center',
          color: 'var(--aq-texto-suave)',
          fontSize: 13,
          marginTop: 18,
        }}
      >
        Apunta la cámara al código. El sistema alterna entrada y salida solo.
      </p>
    </div>
  )
}

export default Escaner
