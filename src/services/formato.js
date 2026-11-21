export function fechaHora(iso) {
  if (!iso) return '—'
  const f = new Date(iso)
  if (Number.isNaN(f.getTime())) return iso
  return f.toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })
}
 
export function soloHora(iso) {
  if (!iso) return '—'
  const f = new Date(iso)
  if (Number.isNaN(f.getTime())) return iso
  return f.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
}
 
export function hoy() {
  const f = new Date()
  const mes = String(f.getMonth() + 1).padStart(2, 0)
  const dia = String(f.getDate()).padStart(2, 0)
  return `${f.getFullYear()}-${mes}-${dia}`
}