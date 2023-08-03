import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './first-login.css'
import { useAppContext } from "../../AppProvider"
import {url} from '../../urls'
import Alerta from '../alerta/alerta'
import Spinner from '../spinner/spinner'




function FirstLogin() {
    const { dispatch, usuario, primerLogin } = useAppContext()
    const navigate = useNavigate()
    //console.log(usuario)
    const [error, setError] = useState(false) //estado del error de usuario al autentificar
    const [smsError, setSmsError] = useState('')// mensaje de error del backend
    const [spin, setSpin] = useState(false)// estado del spinner

    const psswdInitialState = {
        // estado inicial de los password
        antiguoPsswd: '',
        nuevoPsswd: '',
        confirmPsswd: ''
    }

    const [password, setPassword] = useState(psswdInitialState)
    const handleInputChange = (evento) => {
        // funcion de actualizacion de los campos de usuarios mientras va rellenando
        setPassword({ ...password, [evento.target.name]: evento.target.value })
    }

    const handleChangePassword = (event)=>{
        event.preventDefault()
        setSpin(true)
        const data ={
            antiguoPsswd:password.antiguoPsswd,
            nuevoPsswd:password.nuevoPsswd,
            confirmPsswd:password.confirmPsswd,
            userId:usuario._id
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(`${url.main}/first/login`,options)
         .then(res=>res.json())
         .then(usr=>{
            if(usr.respuesta.tipo=='error'){
                setSpin(false)
                setSmsError(usr.respuesta.sms)
                setError(true)
            }else{
                setSpin(false)
                navigate('/auth/login')
            }
            
            
         })
    }

    useEffect(()=>{
        //function de redireccionamiento reset password no efectuado
        if(!primerLogin){
            navigate('/auth/login')
        }
        
    },[primerLogin])

    return (
        <div className='contenedor-principal'>
           
            <div className="titulo-info-container">
                <div className="titulo-container">
                    <h3>{!primerLogin?'':usuario.nombre.toUpperCase()+' '+usuario.apellidos.toUpperCase()}</h3>
                </div>
                <hr />
                <div className="info-actualizar">
                    <div className="m-3">
                        <h6 className=''>Changer le mot de pass</h6>
                        <h6 className='text-center'> par défaut</h6>

                    </div>
                    
                    <form onSubmit={handleChangePassword}>
                        {/* <div className="mt-2">
                            <input type="password"  value={password.antiguoPsswd} onChange={handleInputChange} 
                            className='input-password' name='antiguoPsswd' required placeholder='Ancien mot de pass'/>
                        </div> */}
                        <div className="mt-2">
                            <input type="password" value={password.nuevoPsswd}  onChange={handleInputChange} 
                            className='input-password' name='nuevoPsswd' required placeholder='Nouveau mot de pass'/>
                        </div>
                        <div className="mt-2">
                            <input type="password" value={password.confirmPsswd} onChange={handleInputChange} 
                            className='input-password' name='confirmPsswd' required placeholder='Confirmer mot de pass' />
                        </div>
                        <div className="mt-2">
                            <input type="submit" value='Valider' className='boton-reset col-12' />
                        </div>
                    </form>
                    
                </div>
                <div className="alerta-container m-2">
                    {spin?<Spinner/>:''}
                    {error?<Alerta setError={setError} smsError={smsError}/>:''}
                </div>
                
            </div>
        </div>
    )
}

export default FirstLogin;