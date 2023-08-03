import React, {useEffect} from "react"
import { useAppContext } from '../AppProvider';
function Map(){
   
    // eslint-disable-next-line
    const apiGet = async () => {
        try {
            const respuestaApi = await fetch("http://localhost:5000/admin/apiUsers")
            const datos = await respuestaApi.json()
            return datos.respuesta

        } catch (error) {
            console.log(error)
        }
    }
    
    const {dispatch} = useAppContext()
    
    dispatch({
        type:"SALUDO",
        value:{"msg":"hola fortunato"}
     })

    return(
        <div className="container-fluid bg-dark">
            <div>  
                <h1 className="text-center text-success">OFTloc</h1>
                {/* <button onClick={()=>console.log("hola mundo")}>pulsar</button> */}
            </div>

        </div>
    )
}

export default Map;
