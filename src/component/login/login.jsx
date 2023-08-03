import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import "./login.css"
import { url } from "../../urls"
import { useAppContext } from "../../AppProvider"
import Alerta from '../alerta/alerta'
import Spinner from "../spinner/spinner"

function Login() {
    //funcion dispath
    const { dispatch } = useAppContext()
    //----------------
    const userInitialState = {
        // estado inicial de las informaciones del usuario
        matricula: '',
        password: ''
    }
   
    const [user, setUser] = useState(userInitialState)
    const [error, setError] = useState(false) //estado del error de usuario al autentificar
    const [smsError, setSmsError] = useState('')// mensaje de error del backend
    const [spin, setSpin] = useState(false)


    const handleInputChange = (evento) => {
        // funcion de actualizacion de los campos de usuarios mientras va rellenando
        setUser({ ...user, [evento.target.name]: evento.target.value })
    }
    const navigate = useNavigate()

    const HandleLoginSubmit = (event) => {
        // funcion de autenticacion des el frontend
        event.preventDefault()
        setSpin(true)

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
        fetch(`${url.main}/auth/user`, options)
            .then(res => res.json())
            .then(usr => {
                if (usr.respuesta.tipo == 'exito') {
                    setSpin(false)
                    setError(false)
                    if(usr.user.primerlogin){
                        dispatch({
                            type: "SETUSER",
                            value: { "usr": usr.user },
                        })
                        dispatch({
                            type:'PRIMER-LOGIN',
                            value:{'firsLogin':true}
                        })
                        navigate('/first/login')
                    }else{
                        dispatch({
                            type: "ESTADO-USUARIO",
                            value: { "login": true }
                        })
                        dispatch({
                            type: "SETUSER",
                            value: { "usr": usr.user },
                        })
                        setError(false)
                        navigate('/')
                    }
                    //document.cookie = `token=${usr.token}; max-age=${60 * 2}; path=/; samesite=strict`
                   
                } else {
                    setSpin(false)
                    setError(true)
                    setSmsError(usr.respuesta.sms)
                }
            })
            .catch(error=>{
                setSpin(false)
                alert("SERVEUR HORS CONNEXION, CONTACTEZ L'ADMINISTRATEUR")
            })



        setUser(userInitialState)
    }

  
    const spinner = (
        <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>

    );


    useEffect(() => {



    }, [error])

    return (
        <div className="login-container">

            <div className="login-alert-container">
               

                {error?<Alerta setError={setError} smsError={smsError}/> : ''}
                <form onSubmit={HandleLoginSubmit}>

                    <div className="titulo-form">
                        <h4>Login</h4>
                    </div>

                    <div className="input-container">
                        <input className="input-insert text-light"
                            type="number" placeholder="Matricule"
                            name="matricula"
                            required
                            value={user.matricula}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="input-container">
                        <input className="input-insert text-light"
                            type="password" placeholder="Mot de pass"
                            name="password"
                            required
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <input type="submit" value="Entrer" className="boton-login col-12" />
                    </div>
                    <div className="spinner-container">  {spin?<Spinner/>:''}</div>

                  
                </form>


            </div>

        </div>
    )
}

export default Login;