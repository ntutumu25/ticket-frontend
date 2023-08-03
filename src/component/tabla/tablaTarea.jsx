import { useState } from "react";


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
                    </tr>
                </thead>
                <tbody style={{fontSize:'12px'}}>
                    {getTicket.map((items) => {
                        //metodo para recorrer los tickets recibidos y mostrarlos en tabla
                        return (
                            <tr style={
                                items.prioridad=='H'?{backgroundColor:'#FFA0AF'}:
                                items.prioridad=='M'?{backgroundColor:'#FFFFAA'}:{backgroundColor:'white'}

                            }>
                                <th scope="row">{items.fecha_creacion}</th>
                                <td title={items.titulo}>{items.titulo.substring(0,7)+''+'...'}</td>
                                <td>{items.prioridad}</td>
                                <td style={items.estado?{backgroundColor:'#FFABAF'}:{backgroundColor:'#adff2f'}}>{items.estado?'Ouvert':'Ferme'}</td>
                                <td>{items.departamento_origen}</td>
                                <td>{items.departamento_objetivo}</td>
                                <td>{items.autor.nombre}</td>
                            </tr>
                        )
                    })}
                   
                </tbody>
            </table>
        </div>
    )
}
export default tablaTareas;