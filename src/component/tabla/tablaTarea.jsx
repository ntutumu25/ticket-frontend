import { useState, useEffect } from "react";
import { useAppContext } from "../../AppProvider"
import moment from "moment";
import './tablaTarea.css'
import { url } from "../../urls"
import { BiSolidCommentEdit, BiEdit } from "react-icons/bi";

function TablaTareas({ tipoTarea, getTicket }) {


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Número de elementos por página

    // Calcular índices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = getTicket.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);




    const { usuario } = useAppContext()

    const initialState = {
        //estado initialisation de variables del formulario comentario
        comentario: '',
    }

    const [ticket, setTicket] = useState(0)
    const [comment, setComment] = useState(initialState)

    const handleInputChange = (evento) => {
        // funcion de actualizacion del textaerea comentario
        setComment({ ...comment, [evento.target.name]: evento.target.value })
    }

    const editeTicket = async (id) => {
        // funcion para recibir ticket a editar
        const res = await fetch(`${url.main}/edite-ticket/${id}`)
        const tick = await res.json()

        await setTicket(tick.ticket)
    }

    const closeTicket = async (id) => {
        // funcion para cerrar el ticket
        fetch(`${url.main}/close-ticket/${id}/${usuario.nombre + ' ' + usuario.apellidos}`)
            .then(rsp => rsp.json())
            .then(usr => {
                console.log(usr)
                editeTicket(ticket._id)
            })


    }

    const ticketComment = async (event) => {
        //funcion para comentar un ticket
        event.preventDefault()
        const data = {
            id: ticket._id,
            comentario: comment.comentario,
            usuario: usuario.nombre + ' ' + usuario.apellidos

        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch(`${url.main}/comment`, options)
            .then(rsp => rsp.json())
            .then(usr => {
                console.log(usr)
                setComment(initialState)
                editeTicket(ticket._id)
            })
            .catch(error => {
                alert("SERVEUR HORS CONNEXION, CONTACTEZ L'ADMINISTRATEUR")
            })



    }

    const getRowStyle = (priority, estado) => {
        if (priority === 'HAUT') {
            return { backgroundColor: '#FFA0AF' };
        } else if (priority === 'MOYENE') {
            return { backgroundColor: '#FFFFAA' };
        } else {
            return { backgroundColor: 'white' };
        }
    };




    return (
        <div className="">
            {/* <table class="table" >
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Priorité</th>
                        <th scope="col">Status</th>
                        <th scope="col">Dep.Origin</th>
                        <th scope="col">Dep.Concerné</th>
                        <th scope="col">Agent</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: '12px' }}>
                    {currentItems.map((items) => {
                        //metodo para recorrer los tickets recibidos y mostrarlos en tabla
                        return (
                            <tr style={
                                items.prioridad == 'HAUT' ? { backgroundColor: '#FFA0AF' } :
                                    items.prioridad == 'MOYENE' ? { backgroundColor: '#FFFFAA' } : { backgroundColor: 'white' }

                            } className="fila-tabla">
                                <th scope="row">{moment(items.fecha_creacion).format('lll')}</th>
                                <td title={items.titulo}>{items.titulo.substring(0, 7) + '' + '...'}</td>
                                <td>{items.prioridad}</td>
                                <td style={items.estado ? { backgroundColor: '#FFABAF' } : { backgroundColor: '#adff2f' }}>{items.estado ? 'Ouvert' : 'Ferme'}</td>
                                <td>{items.departamento_origen}</td>
                                <td>{items.departamento_objetivo}</td>
                                <td>{items.autor.nombre.toUpperCase()}</td>
                                <td>
                                    <div className='accion-tabla-container'>
                                        <span title="Editer" id={items._id} className='editar'><BiEdit /></span>
                                        <span onClick={() => editeTicket(items._id)} title="Commentaire" data-bs-toggle="modal" data-bs-target="#modalCommentTicket" id={items._id} className='comentar'><BiSolidCommentEdit /></span>
                                    </div>
                                </td>
                            </tr>

                        )
                    })}

                </tbody>
            </table> */}


            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Priorité</th>
                            <th scope="col">Status</th>
                            <th scope="col">Dep.Origin</th>
                            <th scope="col">Dep.Concerné</th>
                            <th scope="col">Agent</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '12px' }}>
                        {currentItems.map((item) => (
                            <tr key={item._id} style={getRowStyle(item.prioridad, item.estado)} className="fila-tabla">
                                <th scope="row">{moment(item.fecha_creacion).format('lll')}</th>
                                <td title={item.titulo}>{item.titulo.substring(0, 7) + '...'}</td>
                                <td>{item.prioridad}</td>
                                <td style={item.estado ? { backgroundColor: '#FFABAF' } : { backgroundColor: '#adff2f' }}>
                                    {item.estado ? 'Ouvert' : 'Ferme'}
                                </td>
                                <td>{item.departamento_origen}</td>
                                <td>{item.departamento_objetivo}</td>
                                <td>{item.autor.nombre.toUpperCase()}</td>
                                <td>
                                    <div className="accion-tabla-container">
                                        <span title="Editer" id={item._id} className="editar">
                                            <BiEdit />
                                        </span>
                                        <span
                                            onClick={() => editeTicket(item._id)}
                                            title="Commentaire"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalCommentTicket"
                                            id={item._id}
                                            className="comentar"
                                        >
                                            <BiSolidCommentEdit />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* modal para commentar el ticket seleccionado */}
            <div className="modal fade" id="modalCommentTicket" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-light">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">MBIA | Ticket</h1>
                            <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body m-0 p-0">
                            {
                                ticket ?
                                    <div className="row container-principal-comentario">

                                        <div className="col-lg-3 col-sm-12 container-info-ticket">
                                            <div className="etiqueta">TITRE:  <span>{ticket.titulo}</span></div>
                                            <div className="etiqueta">CRÉE PAR:  <span>{ticket.autor.nombre.toUpperCase()}</span></div>

                                            <div className="etiqueta">ÉTAT:
                                                <span className="estado-prioridad" style={ticket.estado ? { backgroundColor: 'red' } : { backgroundColor: 'LawnGreen' }}>
                                                    {ticket.estado == true ? 'Ouvert' : 'Fermé'}
                                                </span>
                                            </div>
                                            {ticket.estado ? '' :
                                                <div className="etiqueta">FERMÉ PAR:  <span>{ticket.usuario_cirre.toUpperCase()}</span></div>
                                            }
                                            <div className="etiqueta">PRIORITÉ:
                                                <span className="estado-prioridad" style={ticket.prioridad == 'HAUT' ? { backgroundColor: 'red' } :
                                                    ticket.prioridad == 'MOYENE' ? { backgroundColor: 'yellow' } : { backgroundColor: 'white' }}>
                                                    {ticket.prioridad}
                                                </span>
                                            </div>
                                            <div className="etiqueta">UNITÉ SOURCE:  <span>{ticket.departamento_origen}</span></div>
                                            <div className="etiqueta">UNITÉ OBJETIF:  <span>{ticket.departamento_objetivo}</span></div>
                                            <div className="etiqueta">DATE D'OUVERTURE:   <span>{moment(ticket.fecha_creacion).format('lll')}</span></div>
                                            <div className="etiqueta">DATE DE FERMETURE:  <span>
                                                {
                                                    ticket.estado ? 'N/A'
                                                        :
                                                        moment(ticket.fecha_cierre).format('lll')
                                                }
                                            </span></div>

                                            <div className="contenedor-boton-cierre">
                                                {ticket.estado ?
                                                    <button onClick={() => closeTicket(ticket._id)}>Fermer ticket</button>
                                                    :
                                                    ''

                                                }

                                            </div>

                                        </div>
                                        <div className="col-lg-9 col-sm-12 container-comentario-ticket" style={{ margin: '0px', padding: '0px' }}>



                                            <div className="contenedor-comentarios" id="contenedor-comentarios">

                                                {ticket.comentarios.map((items) => {
                                                    return (
                                                        <div className="comentario-usuario">

                                                            <div className="usuario-contenedor">
                                                                {/* <span className="letra-inicial">{ticket.comentarios[0].usuario[0]}</span>  */}
                                                                <span className="nombre">{items.usuario.toUpperCase()}</span>
                                                                <span className="tiempo">{moment(items.fecha).format('lll')}</span>
                                                                {/* {moment(items.fecha).format("YYYY-MM-DDTHH:MM:SSZ")} */}
                                                            </div>
                                                            <div className="comentario">
                                                                {/* <input type="text" name="" id="" value={ticket.comentarios[0].comentario} disabled/> */}
                                                                {items.comentario}
                                                            </div>
                                                        </div>
                                                    )
                                                })}


                                            </div>

                                            <div className="contenedor-redaccion-comentario">
                                                <div className="formulario-comentario-contenedor">
                                                    <form onSubmit={ticketComment}>
                                                        <div>
                                                            <textarea disabled={ticket.estado ? false : true} required name="comentario" onChange={handleInputChange} value={comment.comentario} placeholder="Commentaire" className="textarea-comentario"></textarea>
                                                        </div>
                                                        <div>
                                                            <button disabled={ticket.estado ? false : true} type="submit" className="boton-guardar-comentario">Garder</button>
                                                            <button type="button" onClick={() => editeTicket(ticket._id)} className="boton-actualizar-ticker">Mise à jour</button>
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    : ''
                            }

                        </div>

                    </div>
                </div>
            </div>
            <div className="paginacion-container">
                {Array.from({ length: Math.ceil(getTicket.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default TablaTareas;
