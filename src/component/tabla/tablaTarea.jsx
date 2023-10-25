import { useState } from "react";
import './tablaTarea.css'
import { BiSolidCommentEdit, BiEdit } from "react-icons/bi";

function tablaTareas({ tipoTarea, getTicket }) {



    return (
        <div className="tabla-tareas">
            <table class="table" >
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
                    {getTicket.map((items) => {
                        //metodo para recorrer los tickets recibidos y mostrarlos en tabla
                        return (
                            <tr style={
                                items.prioridad == 'H' ? { backgroundColor: '#FFA0AF' } :
                                    items.prioridad == 'M' ? { backgroundColor: '#FFFFAA' } : { backgroundColor: 'white' }

                            } className="fila-tabla">
                                <th scope="row">{items.fecha_creacion}</th>
                                <td title={items.titulo}>{items.titulo.substring(0, 7) + '' + '...'}</td>
                                <td>{items.prioridad}</td>
                                <td style={items.estado ? { backgroundColor: '#FFABAF' } : { backgroundColor: '#adff2f' }}>{items.estado ? 'Ouvert' : 'Ferme'}</td>
                                <td>{items.departamento_origen}</td>
                                <td>{items.departamento_objetivo}</td>
                                <td>{items.autor.nombre}</td>
                                <td>
                                    <div className='accion-tabla-container'>
                                        <span   id={items._id} className='editar'><BiEdit /></span>
                                        <span data-bs-toggle="modal" data-bs-target="#modalCommentTicket" id={items._id} className='comentar'><BiSolidCommentEdit /></span>
                                    </div>
                                </td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>






            <div className="modal fade" id="modalCommentTicket" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nouveu ticket</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default tablaTareas;
