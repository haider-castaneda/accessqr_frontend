import { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { enviar } from '../../services/api'
import { soloHora } from '../../services/formato'

function Escaner() {
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState('')
  const [pausado, setPausado] = useState(false)

  const escaner = useRef(null)   // la instancia, para poder pausarla y reanudarla
  const ocupado = useRef(false)  // evita dos lecturas simultaneas

  useEffect(() => {
    let cancelado = false

    const alLeer = async (texto) => {
      if (ocupado.current) return
      ocupado.current = true
      setError('')

      // Se pausa ANTES de llamar al backend: mientras la peticion viaja,
      // la camara ya no esta leyendo y el QR no se puede registrar otra vez.
      try {
        escaner.current?.pause(true)
      } catch {
        // si la libreria no pudo pausar, el guardia 'ocupado' sigue protegiendo
      }
      setPausado(true)

      try {
        const data = await enviar('/lector/escaneo', { token: texto.trim() })
        setResultado(data)
      } catch (err) {
        setError(err.message)
        setResultado(null)
      } finally {
        ocupado.current = false
      }
    }

    // El modo estricto de React monta, desmonta y vuelve a montar enseguida.
    // Con esta espera, el primer montaje se cancela antes de encender la
    // camara y solo queda un escaner.
    const temporizador = setTimeout(() => {
      if (cancelado) return
      const contenedor = document.getElementById('reader')
      if (contenedor) contenedor.innerHTML = ''
      escaner.current = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      )
      escaner.current.render(alLeer, () => {})
    }, 150)

    return () => {
      cancelado = true
      clearTimeout(temporizador)
      if (escaner.current) escaner.current.clear().catch(() => {})
      escaner.current = null
    }
  }, [])

  // El celador retira el QR y pulsa este boton para volver a leer.
  const nuevoEscaneo = () => {
    setResultado(null)
    setError('')
    setPausado(false)
    try {
      escaner.current?.resume()
    } catch {
      // si no se pudo reanudar, basta con recargar la pestana
    }
  }

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

      {pausado && (
        <div style={{ marginTop: 16 }}>
          <button
            className="aq-btn aq-btn--primario aq-btn--bloque"
            onClick={nuevoEscaneo}
          >
            Nuevo escaneo
          </button>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--aq-texto-suave)',
              fontSize: 13,
              marginTop: 10,
            }}
          >
            Retira el código de la cámara antes de continuar.
          </p>
        </div>
      )}

      {!pausado && (
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
      )}
    </div>
  )
}

export default Escaner
