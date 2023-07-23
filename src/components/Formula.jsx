
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
const Formulas = ({formula}) => {

    const {handleModalEditarFormula, handleModalEliminarFormula} = useProyectos()

    const admin = useAdmin()

    const {nombre, wattsInd, cantidad, wattsTotal, factorDemanda, factorDemandaVa, volts, vl, neutro,
          hilos, linea, iamps, vaP, amps, vaS, ft, fa, temperatura, tipoEquipo, metodo1, metodo2, ampCorr, condCal, hilosTierra, condTierra,
          conductorNeutro, milimetrosTierra, totalMilimetros, canalizacion, caidaTension, porcentajeCaidaTension} = formula
  return (
    <div className="border-b p-5 flex justify-between items-center ">
      
        <div className="flex flex-col p-5">
            <label >Nombre:</label>
            <p className="mb-1 text-xl">{nombre}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Watts por unidad</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{wattsInd}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Cantidad de equipos</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{cantidad}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Total de watts</label>
            <p className="mb-1 text-sm text-gray-500 uppercase p-2">{wattsTotal}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Factor de demanda</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{factorDemanda}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Va</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{vaP}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Factor de demanda VA</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{factorDemandaVa}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Volts</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{volts}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Vl</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{vl}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Fases</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{tipoEquipo}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Neutro</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{neutro}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Hilos</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{hilos}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Lineas</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{linea}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >I amps</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{iamps}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Amperes</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{amps}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Ft</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{ft}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Fa</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{fa}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Temperatura</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{temperatura}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Método 1</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{metodo1}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Método 2</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{metodo2}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Amp Corr</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{ampCorr}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Cond Cal</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{condCal}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Cond Tierra</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{condTierra}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Hilos Tierra</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{hilosTierra}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Mm Conductor + Neutro</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{conductorNeutro}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Mm de Tierra</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{milimetrosTierra}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Total Mm </label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{totalMilimetros}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Canalización</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{canalizacion}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >Factor caída de tensión</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{caidaTension}</p>
        </div>
        <div className="flex flex-col p-5"> 
            <label >% de caída de tensión</label>
            <p className="mb-1 text-sm text-gray-500 uppercase">{porcentajeCaidaTension}</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-2">
            
            <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg mr-3"
            onClick={() =>handleModalEditarFormula(formula)}
            >Editar</button>
            <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg mr-3"
            onClick={ () => handleModalEliminarFormula(formula)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Formulas