import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import ModalFormularioFormula from '../components/ModalFormularioFormula'
import ModalEliminarFormula from '../components/ModalEliminarFormula'
import Formulass from '../components/Formula'
import Alerta from "../components/Alerta"
const Formula = () => {
    
    const params = useParams()
    const {obtenerCuadro, cuadros, cargando, handleModalFormula, alerta} = useProyectos()

    useEffect(() =>{
        obtenerCuadro(params.id)
    }, [])
    const {nombre} = cuadros


    if(cargando) return 'Cargando...'

    const {msg} = alerta
  return (
    <>
      <div className="flex justify-between">
          <h1 className="font-black text-4xl">{nombre}</h1>

      </div>
        <button type="button" onClick={handleModalFormula} className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
          Añadir datos
        </button>
        <p className="font-bold text-xl mt-10">Datos del cuadro de carga</p>
        <div className="flex justify-center">
          <div className=" w-full md:w-1/3 lg:w-1/4">
        {msg &&  <Alerta alerta={alerta} />}
          </div>
        </div>
        <div className="bg-white shadow mt-10 rounded-lg overflow-x-auto">
           {cuadros.formulas?.length ? 
           cuadros.formulas?.map( formula => (
            <Formulass
            key={formula._id}
            formula={formula}
            />
           )) : 
           <p className="text-center my-5 p-10"> No hay cuadros de carga en este proyecto</p>}
        </div> 
      <ModalFormularioFormula />
      <ModalEliminarFormula />
    </>
    )
}

export default Formula