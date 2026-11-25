import { IcoCheck } from './Iconos'
 
function EstadoVacio({ titulo, texto, icono }) {
  return (
    <div className="aq-vacio">
      <span className="aq-vacio__marco">{icono || <IcoCheck />}</span>
      <p className="aq-vacio__titulo">{titulo}</p>
      {texto && <p>{texto}</p>}
    </div>
  )
}
 
export default EstadoVacio
