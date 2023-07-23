import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const TIPOEQUIPO = ['1', '2', '3']

const ModalFormularioFormula = () => {

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [wattsInd, setWattsInd] = useState(0)
    const [cantidad, setCantidad]= useState(0)
    const wattsTotal = wattsInd * cantidad
    const [temperatura, setTemperatura]= useState(0)
    const [tipoEquipo, setTipoEquipo] = useState('')
    const [neutro, setNeutro] = useState(0)
    const [linea, setLinea] = useState(0)
    const vaP = (wattsTotal / 0.8).toFixed(2)
    const vaS = vaP * cantidad
    const [factorDemanda, setFactorDemanda] = useState(0.5)
    const factorDemandaVa = vaS * factorDemanda
    const [hilosTierra, setHilosTierra] = useState(0)
    var hilos = 1

    var volts = 0

    if (tipoEquipo=='1') {
        volts = 127
    } else if(tipoEquipo=='2'){
        volts=220
    }else if(tipoEquipo=='3'){
        volts = 220
    }
    var vl=0

    if (tipoEquipo=='1') {
        vl = 127
    } else if(tipoEquipo=='2'){
        vl=127
    }else if(tipoEquipo=='3'){
        vl = 220
    }

    var iamps=0
    var c1=0
    var c=0
    var c2=0

    if(tipoEquipo=='1'){
        iamps = (factorDemandaVa / vl).toFixed(2)
    }else if(tipoEquipo=='2'){
        c1 = 2 * vl
        c = (factorDemandaVa / c1).toFixed(2)
        iamps = c
    }else if(tipoEquipo=='3'){
        c2 = Math.sqrt(3)
        c1 = c2 * vl
        c = (vaP / c1).toFixed(2)
        iamps = c
    }

    var amps=0
    var am=0
    var a=0
    var b=0

    if(tipoEquipo=='1'){
        amps = (vaP / vl).toFixed(2)
    }else if(tipoEquipo=='2'){
        am = 2 * vl
        a = (vaP / am).toFixed(2)
        amps=a
    }else if(tipoEquipo=='3'){
        b= Math.sqrt(3)
        am = b * vl
        a = (vaP / am).toFixed(2)
        amps = a
    }

    var ft=0
    if(temperatura >=0 &&temperatura <= 10){
        ft=1.2
    }else if(temperatura >=11 &&temperatura <= 15 ){
        ft=1.15
    }else if(temperatura >=16 &&temperatura <= 20 ){
        ft=1.11
    }else if(temperatura >=21 &&temperatura <= 25 ){
        ft=1.05
    }else if(temperatura >=26 &&temperatura <= 30 ){
        ft=1.0
    }else if(temperatura >=31 &&temperatura <= 35 ){
        ft=0.94
    }else if(temperatura >=36 &&temperatura <= 40 ){
        ft=0.88
    }else if(temperatura >=41 &&temperatura <= 45 ){
        ft=0.82
    }else if(temperatura >=50 &&temperatura <= 55 ){
        ft=0.75
    }else if(temperatura >=60 &&temperatura <= 65 ){
        ft=0.67
    }else if(temperatura >=70 &&temperatura <= 75 ){
        ft=0.58
    }else if(temperatura >=80 &&temperatura <= 85 ){
        ft=0.47
    }
    var fa=0
    if(tipoEquipo >='1' &&tipoEquipo <= '3'){
        fa=1
    }else if(temperatura >='4' &&temperatura <= '6' ){
        fa=0.8
    }

    var metodo1 = iamps*1.25

    var met = ft*fa
    var meto = iamps * 1.25
    var metodo2 = meto / met
 
    var ampCorr = Math.max(metodo1, metodo2)

    var condCal=0
    if(ampCorr >=0 &&ampCorr <= 20){
        condCal=12
    }else if(ampCorr >=21 &&ampCorr <= 25 ){
        condCal=10
    }else if(ampCorr >=26 &&ampCorr <= 35 ){
        condCal=10
    }else if(ampCorr >=36 &&ampCorr <= 50 ){
        condCal=8
    }else if(ampCorr >=51 &&ampCorr <= 65 ){
        condCal=6
    }else if(ampCorr >=66 &&ampCorr <= 85 ){
        condCal=4
    }else if(ampCorr >=86 &&ampCorr <= 100 ){
        condCal=3
    }else if(ampCorr >=101 &&ampCorr <= 115 ){
        condCal=2
    }else if(ampCorr >=116 &&ampCorr <= 130 ){
        condCal=1
    }else if(ampCorr >=131 &&ampCorr <= 150 ){
        condCal=1
    }else if(ampCorr >=151 &&ampCorr <= 175 ){
        condCal=2
    }else if(ampCorr >=176 &&ampCorr <= 200 ){
        condCal=3
    }

    var condTierra=0
    if(ampCorr >=0 &&ampCorr <= 19.99){
        condTierra=14
    }else if(ampCorr >=20 &&ampCorr <= 59 ){
        condTierra=12
    }else if(ampCorr >=60 &&ampCorr <= 99 ){
        condTierra=10
    }else if(ampCorr >=100 &&ampCorr <= 199 ){
        condTierra=8
    }else if(ampCorr >=200 &&ampCorr <= 299 ){
        condTierra=6
    }else if(ampCorr >=300 &&ampCorr <= 399 ){
        condTierra=4
    }else if(ampCorr >=400 &&ampCorr <= 499 ){
        condTierra=3
    }else if(ampCorr >=500 &&ampCorr <= 599 ){
        condTierra=2
    }else if(ampCorr >=600 &&ampCorr <= 799 ){
        condTierra=1
    }else if(ampCorr >=800 &&ampCorr <= 999 ){
        condTierra=1
    }else if(ampCorr >=1000 &&ampCorr <= 1199 ){
        condTierra=2
    }else if(ampCorr >=1200 &&ampCorr <= 1599 ){
        condTierra=3
    }else if(ampCorr >=1600 &&ampCorr <= 1999 ){
        condTierra=4
    }

    const conductorNeutro = 10
    const milimetrosTierra=10
    const totalMilimetros = conductorNeutro + milimetrosTierra

    var canalizacion=0
    if(ampCorr >=1 &&ampCorr <= 89){
        canalizacion=0.5
    }else if(ampCorr >=90 &&ampCorr <= 151 ){
        canalizacion=0.75
    }else if(ampCorr >=152 &&ampCorr <= 248 ){
        canalizacion=1
    }else if(ampCorr >=249 &&ampCorr <= 425 ){
        canalizacion=1.25
    }else if(ampCorr >=426 &&ampCorr <= 573 ){
        canalizacion=1.5
    }else if(ampCorr >=574 &&ampCorr <= 937 ){
        canalizacion=2
    }else if(ampCorr >=938 &&ampCorr <= 1323 ){
        canalizacion=2.5
    }else if(ampCorr >=1324 &&ampCorr <= 2046 ){
        canalizacion=3
    }else if(ampCorr >=2047 &&ampCorr <= 2729 ){
        canalizacion=3.5
    }else if(ampCorr >=2730 &&ampCorr <= 3490 ){
        canalizacion=4
    }else if(ampCorr >=0 &&ampCorr <= 0.99 ){
        canalizacion=0
    }

    const caidaTension=10
    const porcentajeCaidaTension=10
    const params = useParams()


    const {modalFormularioFormula, handleModalFormula, mostrarAlerta, alerta, submitFormula, formula} = useProyectos()

    useEffect(() => {
        if(formula?._id){
            setId(formula._id)
            setNombre(formula.nombre)
            setWattsInd(formula.wattsInd)
            setCantidad(formula.cantidad)
            setTipoEquipo(formula.tipoEquipo)
            setFactorDemanda(formula.factorDemanda)
            setNeutro(formula.neutro)
            setLinea(formula.linea)
            setTemperatura(formula.temperatura)
            setHilosTierra(formula.hilosTierra)
            return
        }
        setId('')
        setNombre('')
        setTipoEquipo('')
    }, [formula])

    const handleSubmit = async e =>{
        e.preventDefault()

        if([nombre, wattsInd, cantidad, wattsTotal, cantidad, wattsTotal, factorDemanda, 
            factorDemandaVa, volts, vl, neutro, hilos, linea, iamps, vaP, amps, vaS, ft,
            fa, temperatura, tipoEquipo, metodo1, metodo2, ampCorr, condCal, hilosTierra, condTierra,
            conductorNeutro, milimetrosTierra, totalMilimetros, canalizacion, caidaTension, porcentajeCaidaTension].includes('')){
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            return
        }
        await submitFormula({id, nombre, wattsInd, cantidad, wattsTotal, factorDemanda, 
            factorDemandaVa, volts, vl, neutro, hilos, linea, iamps, vaP, amps, vaS, ft,
            fa, temperatura, tipoEquipo, metodo1, metodo2, ampCorr, condCal, condTierra, hilosTierra, 
            conductorNeutro, milimetrosTierra, totalMilimetros, canalizacion, caidaTension, porcentajeCaidaTension, cuadro: params.id})
        
        setId('')
        setNombre('')
        setTipoEquipo('')
    }
    const {msg} = alerta
    return (
        <Transition.Root show={modalFormularioFormula} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalFormula}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalFormula}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {id ? 'Editar datos' : 'Agregar datos'}
                                    </Dialog.Title>
                                    {msg && <Alerta alerta={alerta}/>}
                                        <form className='my-10' onSubmit={handleSubmit}>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="nombre"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Nombre
                                                    </label>
                                                <input 
                                                    type="text" 
                                                    id="nombre"
                                                    placeholder='Nombre del equipo a instalar'
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={nombre}
                                                    onChange={e => setNombre(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="wattsInd"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Watts individual
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="wattsInd"
                                                    placeholder='Watts por equipo'
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={wattsInd}
                                                    onChange={e=> setWattsInd(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="cantidad"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Cantidad de equipos
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="cantidad"
                                                    placeholder='Cantidad de equipos'
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={cantidad}
                                                    onChange={e=> setCantidad(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="wattsTotal"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Total de watts
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="wattsTotal"
                                                    placeholder='Suma total de watts'
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={wattsTotal}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="tipo-equipo"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Número de fases
                                                </label>
                                                <select
                                                id="tipo-equipo"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={tipoEquipo}
                                                onChange={e => setTipoEquipo(e.target.value)}
                                            >
                                                <option value="">-- Selecciona una fase --</option>

                                                {TIPOEQUIPO.map( opcion => (
                                                    <option key={opcion}>{opcion}</option>
                                                ))}
                                                </select>
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="vap"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Va Principal
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="vap"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={vaP}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="vas"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Va Secundario
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="vas"
                                                    minLength="4" maxLength="4" size="5"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={vaS}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="factor-demanda"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Factor de demanda
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="factor-demanda"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'                                                    
                                                    value={factorDemanda}
                                                    onChange={e=> setFactorDemanda(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="factor-demanda-va"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Factor de demanda Va
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="factor-demanda-va"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={factorDemandaVa}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="amps"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Amps
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="amps"
                                                    step='0.01'
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={amps}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="volts"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Volts
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="volts"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={volts}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="vln"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       VL-N
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="vln"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={vl}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="neutro"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Neutro
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="neutro"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={neutro}
                                                    onChange={e=> setNeutro(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="hilos"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Hilos
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="hilos"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={hilos}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="linea"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Longuitud
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="linea"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={linea}
                                                    onChange={e=> setLinea(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="temperatura"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Temperatura ambiente
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="temperatura"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={temperatura}
                                                    onChange={e=> setTemperatura(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="ft"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       F.T.
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="ft"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={ft}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="fa"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       F.A.
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="fa"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={fa}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="iamps"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       I Amps
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="iamps"
                                                    step='0.01'
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={iamps}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="metodo-1"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Método 1
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="metodo-1"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={metodo1}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="metodo-2"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Metodo 2
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="metodo-2"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={metodo2}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="amp-corr"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Amp Corr
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="amp-corr"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={ampCorr}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="cond-cal"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Cond Cal
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="cond-cal"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={condCal}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="cond-tierra"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Cond Tierra
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="cond-tierra"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={condTierra}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label 
                                                    htmlFor="hilos-tierra"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                        Hilos Tierra
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="hilos-tierra"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={hilosTierra}
                                                    onChange={e=> setHilosTierra(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="cond-neutro"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Conductor + neutro
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="cond-neutro"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={conductorNeutro}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="mm-tierra"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       mm2 de Tierra
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="mm-tierra"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={milimetrosTierra}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="totalmm"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Total mm2
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="totalmm"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={totalMilimetros}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="canalizacion"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Canalización
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="canalizacion"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={canalizacion}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="caida-tension"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       Caída de tensión
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="caida-tension"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={caidaTension}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-5 hidden'>
                                                <label 
                                                    htmlFor="porcentaje-tension"
                                                    className='text-gray-700 uppercase font-bold text-sm'
                                                    >
                                                       % caída de tensión
                                                    </label>
                                                <input
                                                    type='number' 
                                                    id="porcentaje-tension"
                                                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                    value={porcentajeCaidaTension}
                                                    readOnly
                                                />
                                            </div>

                                            <input
                                            type="submit"
                                            className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
                                            value={id ? 'Guardar cambios' : 'Añadir datos'}
                                        />
                                        </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioFormula