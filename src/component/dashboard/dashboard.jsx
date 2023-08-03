import React,{useEffect} from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import './dashboard.css'
import { useAppContext } from '../../AppProvider';

function Dashboard(){

    const {userState} = useAppContext()
    const navigate = useNavigate()
    
    
    useEffect(()=>{
        //function de redireccionamiento de usuarios no authenticados
        if(userState){
            console.log(userState)
            
        }else{
            navigate('/auth/login')
        }
        
    },[userState])

    return(
        <div className='dashboard-container'>
            <h3>DASHBOARD</h3>
            <NavLink to={'/'}>WorkSpace</NavLink>
        </div>
    )
}



export default Dashboard;