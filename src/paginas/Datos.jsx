import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'

const Datos = () =>{

    const [nombre, setNombre] = useState('')
    const [wattsInd, setWattsInd] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [tempAmb, setTempAmb] = useState('')
    const [factorDemanda, setFactorDemanda] = useState('')
    let [tableroId, setTableroId] = useState('')
    const [neutro, setNeutro] = useState(0)
    const [linea, setLinea] = useState(0)
    const watts = wattsInd * cantidad
    const vaP = watts / 0.8
    const vaS = vaP * cantidad
    const factorDemandaVA = vaS * factorDemanda
    const navigate = useNavigate()  

  
    var hilos = 1

    var Volts = 0

    if (tableroId==1) {
        Volts = 220
    } else if(tableroId==2){
        Volts=220
    }else if(tableroId==3){
        Volts = 127
    }

    var vl=0

    if (tableroId==1) {
        vl = 127
    } else if(tableroId==2){
        vl=220
    }else if(tableroId==3){
        vl = 127
    }

    var iamps=0
    var c1=0
    var c=0
    var c2=0

    if(tableroId==1){
        c1 = 2 * vl
        c = factorDemandaVA / c1
        iamps = c
    }else if(tableroId==2){
        c2 = Math.sqrt(3)
        c1 = c2 * vl
        c = vaP / c1
        iamps = c
    }else if(tableroId==3){
        iamps = factorDemandaVA / vl
    }

    var amps=0
    var am=0
    var a=0
    var b=0

    if(tableroId==1){
        am = 2 * vl
        a = vaP / am
        amps=a
    }else if(tableroId==2){
        b= Math.sqrt(3)
        am = b * vl
        a = vaP / am
        amps = a
    }else if(tableroId==3){
        amps = vaP / vl
    }

    var ft=0
    if(tempAmb >=0 && tempAmb <= 10){
        ft=1.2
    }else if(tempAmb >=11 && tempAmb <= 15 ){
        ft=1.15
    }else if(tempAmb >=16 && tempAmb <= 20 ){
        ft=1.11
    }else if(tempAmb >=21 && tempAmb <= 25 ){
        ft=1.05
    }else if(tempAmb >=26 && tempAmb <= 30 ){
        ft=1.0
    }else if(tempAmb >=31 && tempAmb <= 35 ){
        ft=0.94
    }else if(tempAmb >=36 && tempAmb <= 40 ){
        ft=0.88
    }else if(tempAmb >=41 && tempAmb <= 45 ){
        ft=0.82
    }else if(tempAmb >=50 && tempAmb <= 55 ){
        ft=0.75
    }else if(tempAmb >=60 && tempAmb <= 65 ){
        ft=0.67
    }else if(tempAmb >=70 && tempAmb <= 75 ){
        ft=0.58
    }else if(tempAmb >=80 && tempAmb <= 85 ){
        ft=0.47
    }
    var fa=0
    if(tableroId >=1 && tempAmb <= 3){
        fa=1
    }else if(tempAmb >=4 && tempAmb <= 6 ){
        fa=0.8
    }

     const store = async (e) => {
        e.preventDefault()
        await axios.post(URI,   {   nombre: nombre, cantidad:cantidad, factorDemanda:factorDemanda, 
                                    factorDemandaVA:factorDemandaVA, tableroId:tableroId, Volts:Volts, vl:vl,
                                    neutro:neutro, hilos:hilos, linea:linea, iamps:iamps, watts:watts, vaP:vaP, amps:amps, 
                                    vaS:vaS, wattsInd:wattsInd, ft:ft, fa:fa, tempAmb:tempAmb
                                })
        navigate('/')
        alert('Elemento añadido con éxito')
    }  
   

    return(
        <div>

        
        <h3>Crear equipos</h3>
            <form  className='container text-center'>
        
                <div className='form-group row'>

                    <div className='form-group col-md-3'> 
                        <label className='form-label'>Nombre</label>
                        <input
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}
                        type='text'
                        className='form-control'
                        required
                        />
                    </div>
                    <div className='form-group col-md-3'> 
                        <label className='form-label'>Watts por unidad</label>
                        <input
                        value={wattsInd}
                        onChange={(e)=> setWattsInd(e.target.value)}
                        type='text'
                        className='form-control'
                        required
                        />
                    </div>
                    <div className='form-group col-md-3'>
                        <label className='form-label'>Cantidad</label>
                        <input
                        value={cantidad}
                        onChange={(e)=> setCantidad(e.target.value)}
                        type='number'
                        className='form-control'
                        required
                        />
                    </div>
                    <div className='form-group col-md-3'>
                        <label className='form-label'>Total de Watts</label>
                        <input
                        value={watts}
                        type='number'
                        className='form-control'
                        readOnly
                        />
                    </div>
                    <div className='form-group col-md-3 mt-2'> 
                        <label className='form-label'>Número de fases</label>
                        <select  value={tableroId} onChange={(e) => setTableroId(e.target.value)} className='form-control mb-2 text-center' required>
                            <option value=''>Selecciona la fase</option>
                            <option value={3}>1</option>
                            <option value={1}>2</option>
                            <option value={2}>3</option>
                        </select>
                    
                    </div>
                    <div className='form-group col-md-3 opacity-75 d-none'>
                        <label className='form-label'>Va Principal</label>
                        <input
                        value={vaP}
                        type='number'
                        className='form-control'
                        readOnly
                        />
                    </div>
                    <div className='form-group col-md-3 opacity-75 d-none'>
                        <label className='form-label'>Va Secundario</label>
                        <input
                        value={vaS}
                        type='number'
                        className='form-control'
                        readOnly
                        />
                    </div>
                    <div className='form-group col-md-3'> 
                        <label className='form-label'>FactorDemanda</label>
                        <input
                        value={factorDemanda}
                        onChange={(e)=> setFactorDemanda(e.target.value)}
                        type='number'
                        min="0.5"
                        max="1"
                        step="0.1"
                        className='form-control'
                        required
                        />
                    </div>
                    <div className='form-group col-md-3 opacity-75'> 
                        <label className='form-label'>FactorDemandaVA</label>
                        <input
                        value={factorDemandaVA}
                        type='number'
                        className='form-control'
                        readOnly
                        /> 
                    </div>
                    <div className='form-group col-md-3 opacity-75'>
                        <label className='form-label'>Amps</label>
                        <input
                        value={amps}
                        type='number'
                        className='form-control'
                        readOnly
                        />
                    </div>

                    <div className='form-group col-md-3 opacity-75 mt-2 d-none'>
                        <label className='form-label'>Volts</label>
                        <input 
                        id='vol'
                        type='number'
                        className='form-control'
                        value={Volts}
                        readOnly
                        />
                    </div>
                    <div className='form-group col-md-3 opacity-75 mt-2'>
                        <label className='form-label'>VL-N</label>
                        <input 
                        type='number'
                        className='form-control'
                        value={vl}
                        readOnly
                        />
                    </div>
                    <div className='form-group col-md-3 mt-2'>
                        <label className='form-label'>Neutro</label>
                        <input 
                        type='number'
                        value={neutro}
                        onChange={(e)=> setNeutro(e.target.value)}
                        className='form-control'
                        />
                    </div>
                    <div className='form-group col-md-3 opacity-75 mt-2'>
                        <label className='form-label'>Hilos</label>
                        <input 
                        type='number'
                        className='form-control'
                        value={hilos}
                        readOnly
                        />
                    </div>
                    <div className='form-group col-md-3 mt-2'>
                        <label className='form-label'>Longuitud</label>
                        <input
                        value={linea}
                        onChange={(e)=> setLinea(e.target.value)}
                        type='number'
                        className='form-control'
                        />
                    </div>
                    <div className='form-group col-md-3 mt-2'>
                        <label className='form-label'>Temperatura ambiente</label>
                        <input
                        value={tempAmb}
                        onChange={(e)=> setTempAmb(e.target.value)}
                        type='number'
                        className='form-control'
                        required
                        />
                    </div>

                    <div className='form-group col-md-3 opacity-75 mt-2'>
                    <label className='form-label'>F.T.</label>
                        <input 
                        type='number'
                        className='form-control'
                        value={ft}
                        readOnly
                        />
                    </div>
                    <div className='form-group col-md-3 opacity-75 mt-2'>
                    <label className='form-label'>F.A.</label>
                        <input 
                        type='number'
                        className='form-control'
                        value={fa}
                        readOnly
                        />
                    </div>
                    <div className='form-group col-md-3 opacity-75 mt-2 d-none'>
                        <label className='form-label'>I amps</label>
                        <input 
                        type='number'
                        className='form-control'
                        value={iamps}
                        readOnly
                        />
                    </div>

                    <div className='d-grid col p-4 mt-2'>
                    <button type='submit' className='btn btn-primary '>Guardar</button>
                    </div>
                </div>
            </form>
            </div>
    )
}
export default Datos