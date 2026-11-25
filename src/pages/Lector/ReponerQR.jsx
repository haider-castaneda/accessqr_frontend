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
    <section className="aq-tarjeta">
      <div className="aq-tarjeta__cabecera">
        <h2 className="aq-tarjeta__titulo">Reponer el QR de un usuario</h2>
      </div>

      <div className="aq-tarjeta__cuerpo">
        {error && (
          <div className="aq-aviso aq-aviso--error">
            <span className="aq-aviso__punto" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={reponer} style={{ marginBottom: 18 }}>
          <div className="aq-campo-grupo">
            <label className="aq-etiqueta">Número de documento</label>
            <input
              type="text"
              className="aq-campo"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
            />
          </div>

          <button
            className="aq-btn aq-btn--primario aq-btn--bloque"
            disabled={cargando}
          >
            {cargando ? 'Generando...' : 'Generar QR nuevo'}
          </button>
        </form>

        {datos && (
          <div
            className="aq-marco aq-aparece"
            style={{
              background: '#fff',
              border: '1px solid var(--aq-borde)',
              padding: 22,
              textAlign: 'center',
            }}
          >
            <p className="aq-tabla__principal" style={{ marginBottom: 12 }}>
              {datos.nombre}
            </p>
            <img
              src={datos.qr}
              alt="QR nuevo"
              style={{ width: '100%', maxWidth: 210 }}
            />
            <p className="aq-ayuda" style={{ marginTop: 12 }}>
              Pídele que le tome una foto. El código anterior ya no sirve.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ReponerQR
