import React, { useState, useEffect } from "react"
import { useAppContext } from "../../AppProvider"
import "./ticket.css"
//componentes para el editor de texto
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//----------------------------------
import { BsSearch, BsFileEarmarkDiffFill } from "react-icons/bs";
import { FaTasks } from 'react-icons/fa'
import { BiTaskX, BiTask } from 'react-icons/bi'
import { BsFillPersonLinesFill } from 'react-icons/bs'


//importacion de componentes propios
import TablaTareas from "../tabla/tablaTarea";
import Spinner from "../spinner/spinner";
import { url } from "../../urls"

function TicketSpace({ isScrolling }) {

  const { userState, dispatch, usuario } = useAppContext()
  const [header, setHeader] = useState(0) //variable para manejar el menu de selecion
  const [tickets, setTickets]= useState([]) //variable para almacenar tickets del backend
  const [spin, setSpin] = useState(false)
 


  const handleBuscar = (event) => {
    // funcion para hacer busqueda de tareas 
    event.preventDefault()
    alert('Vous allez chercher')
  }

  const initialState = {
    //estado initialisation de variables del formulario
    titulo: '',
    departamento: 'none',
    comentario: '',
    prioridad: 'none',
  }

  const [newTicket, setNewTicket] = useState(initialState)
  const handleInputChange = (evento) => {
    // funcion de actualizacion de los campos de un nuevo ticket mientras va rellenando
    setNewTicket({ ...newTicket, [evento.target.name]: evento.target.value })
  }

  const getTicket = async () => {
    // funcion para recibir todos los ticket del backend
    const res = await fetch(`${url.main}/ticket/${header}/${usuario._id}/${usuario.departamento}`)
    const tick = await res.json()
    setTickets(tick.ticket)
  }
  
 

  const handleNuevaTarea = (event) => {
    // funcion para registrar un nuevo ticket en el backend
    event.preventDefault()
    setSpin(true)

    const data = {
      titulo: newTicket.titulo,
      comentario: newTicket.comentario,
      prioridad: newTicket.prioridad,
      departamento_objetivo: newTicket.departamento,
      autor: usuario,
      departamento_origen: usuario.departamento
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch(`${url.main}/addTicket`, options)
      .then(rsp => rsp.json())
      .then(usr => {
        if (usr.sms == 'exito') {
          setSpin(false)
          setNewTicket(initialState)
          getTicket()
        }
      })
      .catch(error => {
        setSpin(false)
        alert("SERVEUR HORS CONNEXION, CONTACTEZ L'ADMINISTRATEUR")
        setNewTicket(initialState)
      })
  }

  useEffect(() => {

    getTicket()
    

  }, [header])


  return (
    <div className="ticket-main-container">
      <div className={isScrolling > 5 ? 'static-header-menu' : ''}>
        <div className="menus-ticket-container">
          <div className="header-menu">

            <div className={header == 0 ? 'header-items selectHeader' : 'header-items'} onClick={() => {
              setHeader(0)

            }}>
              <span className='icono-tarea'><FaTasks /></span> Tous
            </div>
            <div className={header == 1 ? 'header-items selectHeader' : 'header-items'} onClick={() => {
              setHeader(1)
            }}>
              <span className='icono-tarea'><BiTaskX /></span> Ouvertes</div>

            <div className={header == 2 ? 'header-items selectHeader' : 'header-items'} onClick={() => {
              setHeader(2)


            }}>
              <span className='icono-tarea'><BiTask /></span>Fermés
            </div>

            <div className={header == 3 ? 'header-items selectHeader' : 'header-items'} onClick={() => {
              setHeader(3)


            }}>
              <span className='icono-tarea'><BsFillPersonLinesFill /></span>Mes Tickets
            </div>

          </div>
          <div className="btn-tarea-container">
            <button className="btn-tarea" data-bs-toggle="modal" data-bs-target="#modalTareaAdd"><span><BsFileEarmarkDiffFill /></span> Nouvelle tâches</button>
          </div>

        </div>
        <div className="form-buscar-container">
          <form onSubmit={handleBuscar}>
            <div className="input-container">
              <input className="input-buscar" type="text" placeholder="Titre" />
              <button className="boton-buscar"><BsSearch /></button>
            </div>
          </form>
        </div>

      </div>

      <div className={isScrolling > 5 ? 'tabla-container' : ''}>
        <TablaTareas tipoTarea={header} getTicket={tickets} />
      </div>



      {/* modal para agregar una nueva tarea  */}
      <div className="modal fade" id="modalTareaAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Nouveu ticket</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="body-container">

                <form onSubmit={handleNuevaTarea}>
                  <div className="m-2">
                    <label htmlFor="titulo">Titre</label>
                    <input required onChange={handleInputChange} name="titulo" value={newTicket.titulo} className="input-text" type="text" placeholder="Ej: ILS" />
                  </div>
                  <div className="m-2">
                    <label htmlFor="departamento">Departement concerné</label>
                    <select value={newTicket.departamento} onChange={handleInputChange} name="departamento" id="departamento" className="input-option">
                      <option value="none" disabled selected>Departement concerné</option>
                      <option value="IRE-IGC">IRE/IGC</option>
                      <option value="SLI">SLI</option>
                      <option value="ENA-MTEO">ENA-MTEO</option>
                      <option value="CDT">CDT</option>
                    </select>
                  </div>
                  <div className="m-2">
                    <label htmlFor="prioridad">Criticité</label>
                    <select value={newTicket.prioridad} onChange={handleInputChange} name="prioridad" id="prioridad" className="input-option">
                      <option value="none" disabled selected>Criticité</option>
                      <option value="H">HAUT</option>
                      <option value="M">MOYENNE</option>
                      <option value="B">BASS</option>
                    </select>
                  </div>
                  <div className="m-2" >
                    <label htmlFor="comentario" style={{ display: 'block' }}>Commentaire</label>
                    <textarea required name="comentario" onChange={handleInputChange} value={newTicket.comentario} className="input-textArea">
                    </textarea>
                    {/* <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      placeholder="Anomalie constaté"
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"

                    /> */}
                  </div>
                  <div className="m-2">
                    <input className="btn btn-primary col-12" type="submit" value="Registrer" />
                  </div>
                  {spin ?
                    <div className="col-12 spin">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>

                    : ''}
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}


export default TicketSpace;
