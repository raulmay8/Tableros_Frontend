import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import io from 'socket.io-client'

let socket

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    const [proyectos, setProyectos] = useState([])
    const [formulas, setFormulas] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioCarga, setModalFormularioCarga] = useState(false)
    const [cuadro, setCuadro] = useState({})
    const [cuadros, setCuadros] = useState([])
    const [modalEliminarCuadro, setModalEliminarCuadro] = useState(false)
    const [modalFormularioFormula, setModalFormularioFormula] = useState(false)
    const [formula, setFormula] = useState({})
    const [modalEliminarFormula, setModalEliminarFormula] = useState(false)
    const [buscador, setBuscador] = useState(false)
    

    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    

    const {auth} = useAuth()

    const navigate = useNavigate()

    useEffect(() =>{
        const obtenerProyectos = async () =>{
            try {
                const token = localStorage.getItem('token')
                if(!token) return
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('proyectos', config)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [auth])

    useEffect (() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }
    const submitProyecto = async proyecto =>{

        if(proyecto.id){
           await editarProyecto(proyecto)
        }else{
           await nuevoProyecto(proyecto)
        }
    }
    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
                if(!token) return
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.put(`proyectos/${proyecto.id}`, proyecto, config)

                const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
                setProyectos(proyectosActualizados)
                setAlerta({
                    msg:'Proyecto actualizado correctamente',
                    error:false
                })
                setTimeout(() =>{
                    setAlerta({})
                    navigate('/proyectos')
                }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config)

            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`proyectos/${id}`, config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }finally{
            setCargando(false)
        }
    }
 

    const eliminarProyecto = async id =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleModalCarga = () =>{
        setModalFormularioCarga(!modalFormularioCarga)
        setCuadro({})
    }

    const submitCuadro = async cuadro => {
        if(cuadro?.id){
            await editarCuadro(cuadro)
        }else{
            await crearCuadro(cuadro)
        }
    }
    const obtenerCuadro = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`cuadros/${id}`, config)
            setCuadros(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }finally{
            setCargando(false)
        }
    }
    const crearCuadro = async cuadro => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/cuadros', cuadro, config)
    
            setAlerta({})
            setModalFormularioCarga(false)

            socket.emit('nuevo cuadro', data)
        } catch (error) {
            console.log(error)
        }
    }
    const editarCuadro = async cuadro => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/cuadros/${cuadro.id}`, cuadro, config)
            
            setAlerta({})
            setModalFormularioCarga(false)

            socket.emit('actualizar cuadro', data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarCuadro = cuadro => {
        setCuadro(cuadro)
        setModalFormularioCarga(true)
    }
    const handleModalEliminarCuadro = cuadro => {
        setCuadro(cuadro)
        setModalEliminarCuadro(!modalEliminarCuadro)
    }
    const eliminarCuadro = async () =>{
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/cuadros/${cuadro._id}`, config)
                setAlerta({
                    msg:data.msg,
                    error:false
                })
                
                setModalEliminarCuadro(false)

                socket.emit('eliminar cuadro', cuadro)

                setCuadro({})
                setTimeout(() => {
                    setAlerta({})
                }, 3000)

        } catch (error) {
            console.log(error)
        }
    }
    const handleModalFormula = () =>{
        setModalFormularioFormula(!modalFormularioFormula)
        setFormula({})
    }

    const submitFormula = async formula => {
        if(formula?.id){
            await editarFormula(formula)
        }else{
            await crearFormula(formula)
        }
    }
    const crearFormula = async formula => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/formulas', formula, config)
            setFormulas([...formulas, data])
            setAlerta({
            msg: 'Datos agregados correctamente',
            error: false
        })
            setTimeout(() => {
                setAlerta({})
                setModalFormularioFormula(false)
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const editarFormula = async formula => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`formulas/${formula.id}`, formula, config)
            const formulasActualizadas = formulas.map( formulaState => formulaState._id === data._id ? data : formulaState)
            setFormulas(formulasActualizadas)
            setAlerta({})
            setModalFormularioFormula(false)
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarFormula = formula => {
        setFormula(formula)
        setModalFormularioFormula(true)
    }
    const handleModalEliminarFormula = formula => {
        setFormula(formula)
        setModalEliminarFormula(!modalEliminarFormula)
    }
    const eliminarFormula = async () =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/formulas/${formula._id}`, config)
            /* const formulaActualizada = {...cuadro}
            formulaActualizada.formulas = formulaActualizada.formulas.filter(formulaState => formulaState._id !== formula._id) */
            const formulaActualizada = formulas.filter(formulaState => formulaState._id !== _id)
            setFormula(formulaActualizada)
            setAlerta({
                msg:data.msg,
                error:false
            }) 
            setFormula({})
            setModalEliminarFormula(false)
            setTimeout(() => {
                setAlerta({})
            }, 3000)
    } catch (error) {
        console.log(error)
    }
}
    const submitColaborador = async email =>{
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/proyectos/colaboradores',{email}, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error: true
            })
        }finally{
            setCargando(false)
        }
    }
    const agregarColaborador = async email =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error: true
            })
        }
    }
    const handleModalEliminarColaborador = (colaborador) =>{
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }
    const eliminarColaborador = async () =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setProyecto(proyectoActualizado)
            setAlerta({
                msg:data.msg,
                error: false
            })
            setColaborador({})
            setModalEliminarColaborador(false)
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const completarTarea = async id =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/cuadros/estado/${id}`, {}, config)
            
            setCuadro({})
            setAlerta({})

            socket.emit('cambiar estado', data)
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleBuscador = () =>{
        setBuscador(!buscador)
    }
    const submitCuadrosProyecto = (cuadro) =>{
        const proyectoActualizado = { ...proyecto}
        proyectoActualizado.cuadros = [...proyectoActualizado.cuadros, cuadro]
        setProyecto(proyectoActualizado)
    }
    const eliminarCuadroProyecto = cuadro =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.cuadros = proyectoActualizado.cuadros.filter(cuadroState => cuadroState._id !== cuadro._id)
        setProyecto(proyectoActualizado)
    }
    const actualizarCuadroProyecto = cuadro =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.cuadros = proyectoActualizado.cuadros.map( cuadroState => cuadroState._id === cuadro._id ? cuadro : cuadroState)
        setProyecto(proyectoActualizado)
    }
    const cambiarEstadoCuadro = cuadro =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.cuadros = proyectoActualizado.cuadros.map(cuadroState => cuadroState._id === cuadro._id ? cuadro : cuadroState)
        setProyecto(proyectoActualizado)
    }
    const cerrarSesionProyectos = () => {
        setProyectos([])
        setProyecto({})
        setCuadros([])
        setCuadro({})
        setAlerta({})
    }
    return(
        <ProyectosContext.Provider
        value={{
            proyectos, 
            mostrarAlerta,
            alerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,

            cuadros,
            obtenerCuadro,
            modalFormularioCarga,
            handleModalCarga,
            submitCuadro,
            handleModalEditarCuadro,
            cuadro,
            modalEliminarCuadro,
            handleModalEliminarCuadro,
            eliminarCuadro,

            formulas,
            modalFormularioFormula,
            handleModalFormula,
            submitFormula,
            handleModalEditarFormula,
            formula,
            modalEliminarFormula,
            handleModalEliminarFormula,
            eliminarFormula,

            submitColaborador,
            colaborador,
            agregarColaborador,
            handleModalEliminarColaborador,
            modalEliminarColaborador,
            eliminarColaborador,
            completarTarea,
            handleBuscador,
            buscador,
            
            submitCuadrosProyecto,
            eliminarCuadroProyecto,
            actualizarCuadroProyecto,
            cambiarEstadoCuadro,

            cerrarSesionProyectos
        }}
        >{children}
        </ProyectosContext.Provider>
    )
}
export{
    ProyectosProvider
}
export default ProyectosContext