import { cerrarSesion } from './sesion'
 
const API_URL = import.meta.env.VITE_API_URL || '/api'
 
export async function peticionApi(endpoint, opciones = {}) {
  const token = localStorage.getItem('token')
 
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(opciones.headers || {}),
  }
 
  let respuesta
  try {
    respuesta = await fetch(`${API_URL}${endpoint}`, { ...opciones, headers })
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisa que el backend este encendido.')
  }
 
  let datos = {}
  try {
    datos = await respuesta.json()
  } catch {
    datos = {}
  }
 
  if (respuesta.status === 401 && token) {
    cerrarSesion()
    window.location.href = '/'
    throw new Error(datos.error || 'La sesion vencio, vuelve a entrar')
  }
 
  if (!respuesta.ok) {
    throw new Error(datos.error || `Error HTTP ${respuesta.status}`)
  }
 
  return datos
}
 
export const obtener = (endpoint) => peticionApi(endpoint)
 
export const enviar = (endpoint, cuerpo) =>
  peticionApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(cuerpo || {}),
  })