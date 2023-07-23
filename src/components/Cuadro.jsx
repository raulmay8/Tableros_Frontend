import { Link } from "react-router-dom"
import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
const Cuadro = ({cuadro}) => {
  
  const {handleModalEditarCuadro, handleModalEliminarCuadro, completarTarea} = useProyectos()

  const admin = useAdmin()

    const {nombre, descripcion, fechaEntrega, tipo, espacio, estado, _id} = cuadro
  return (
    <div className="border-b p-5 flex justify-between items-center">
      
        <div className="flex flex-col items-start">
          
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
            <p className="mb-1 text-sm">{ formatearFecha(fechaEntrega) }</p>
            <p className="mb-1 text-gray-600">Tipo de tablero: {tipo}</p>
            <p className="mb-1 text-gray-600">Espacios del tablero: {espacio}</p>
            {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completado por: {cuadro.completado.nombre}</p>}
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
            <Link
            to={`/proyectos/crear/agregar/${_id}`}
            className="bg-green-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg text-center"
            >Datos</Link>
          {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() =>handleModalEditarCuadro(cuadro)}
            >Editar</button>
          )}
          <button
            className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
              onClick={() => completarTarea(_id)}
            >{estado ? 'Completa' : 'Incompleta'}</button>
         
          {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={ () => handleModalEliminarCuadro(cuadro)}
          >Eliminar</button>
          )}
        </div>
    </div>
  )
}

export default Cuadro