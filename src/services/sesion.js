const LLAVES = ['token', 'rol', 'nombre']
 
export function guardarSesion(datos) {
  localStorage.setItem('token', datos.token)
  localStorage.setItem('rol', datos.rol)
  localStorage.setItem('nombre', datos.nombre)
}
 
export function cerrarSesion() {
  LLAVES.forEach((llave) => localStorage.removeItem(llave))
}
 
export function guardarRol(rol) {
  localStorage.setItem('rol', rol)
}
 
export const hayToken = () => Boolean(localStorage.getItem('token'))
export const rolActual = () => localStorage.getItem('rol')
export const nombreActual = () => localStorage.getItem('nombre')
 
// A donde mandar a cada rol despues de entrar
export function rutaSegunRol(rol) {
  if (rol === 'administrador') return '/panel-admin'
  if (rol === 'celador') return '/lector'
  return '/'
}