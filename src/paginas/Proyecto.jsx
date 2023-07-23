import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import ModalFormularioCarga from "../components/ModalFormularioCarga"
import ModalEliminarCuadro from "../components/ModalEliminarCuadro"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import Cuadros from "../components/Cuadro"
import Colaborador from "../components/Colaborador"
import io from 'socket.io-client'

let socket

const Proyecto = () => {
    const params = useParams()
    const {obtenerProyecto, proyecto, cargando, handleModalCarga, alerta, submitCuadrosProyecto, eliminarCuadroProyecto, actualizarCuadroProyecto, cambiarEstadoCuadro} = useProyectos()
 
    const admin = useAdmin()

    useEffect(() =>{
        obtenerProyecto(params.id)
    }, [])

    useEffect(()=>{
      socket = io(import.meta.env.VITE_BACKEND_URL)
      socket.emit('abrir proyecto', params.id)
    }, [])

    useEffect(() => {
      socket.on("cuadro agregado", cuadroNuevo =>{
        if(cuadroNuevo.proyecto === proyecto._id){
          submitCuadrosProyecto(cuadroNuevo)
        }
      })
      socket.on('cuadro eliminado', cuadroEliminado =>{
        if(cuadroEliminado.proyecto === proyecto._id){
          eliminarCuadroProyecto(cuadroEliminado)
        }
      })
      socket.on('cuadro actualizado', cuadroActualizado =>{
        if(cuadroActualizado.proyecto._id === proyecto._id){
          actualizarCuadroProyecto(cuadroActualizado)
        }
      })
      socket.on('nuevo estado', nuevoEstadoCuadro => {
        if(nuevoEstadoCuadro.proyecto._id === proyecto._id){
          cambiarEstadoCuadro(nuevoEstadoCuadro)
        }
      })
    })
    const {nombre} = proyecto
    if(cargando) return 'Cargando...'
    const {msg} = alerta

  return (
    <>
      <div className="flex justify-between">
          <h1 className="font-black text-4xl">{nombre}</h1>

          {admin && (
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>

            <Link
            to={`/proyectos/editar/${params.id}`}
            className="uppercase font-bold"
            >Editar</Link>
            </div>
          )}
      </div>
      {admin && (
        <button type="button" onClick={handleModalCarga} className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
          Nuevo cuadro de carga
        </button>
      )}

        <p className="font-bold text-xl mt-10">Cuadros de carga del proyecto</p>

        <div className="bg-white shadow mt-10 rounded-lg">
           {proyecto.cuadros?.length ? 
           proyecto.cuadros?.map( cuadro => (
            <Cuadros
            key={cuadro._id}
            cuadro={cuadro}
            />
           )) : 
           <p className="text-center my-5 p-10"> No hay cuadros de carga en este proyecto</p>}
        </div>
        {admin && (
          <>
            <div className="flex items-center justify-between mt-10">
              <p className="font-bold text-xl mt-10">Colaboradores</p>
                <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className="text-gray-400 hover:text-black uppercase font-bold"
                >
                Añadir
                </Link>
            </div>
            
            <div className="bg-white shadow mt-10 rounded-lg">
              {proyecto.colaboradores?.length ? 
              proyecto.colaboradores?.map( colaborador => (
                  <Colaborador
                    key={colaborador._id}
                    colaborador={colaborador}
                  />
              )) : 
              <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>}
            </div>
          </>
        )}
        <ModalFormularioCarga />
        <ModalEliminarCuadro />
        <ModalEliminarColaborador/>
    </>
    )
}

export default Proyecto