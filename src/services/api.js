const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.44:5000/api';

export async function peticionApi(endpoint, opciones = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(opciones.headers || {})
  };

  const respuesta = await fetch(`${API_URL}${endpoint}`, {
    ...opciones,
    headers
  });

  let datos = {};
  try {
    datos = await respuesta.json();
  } catch {
    datos = {};
  }

  if (!respuesta.ok) {
    throw new Error(datos.error || datos.mensaje || `Error HTTP ${respuesta.status}`);
  }

  return datos;
}
