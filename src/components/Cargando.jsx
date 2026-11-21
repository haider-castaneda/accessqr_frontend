function Cargando({ texto = 'Cargando...' }) {
  return (
    <div className="text-center text-muted py-5">
      <div className="spinner-border text-primary mb-3" role="status" />
      <p className="mb-0">{texto}</p>
    </div>
  )
}
 
export default Cargando
