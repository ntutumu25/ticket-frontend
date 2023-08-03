import { useEffect, useState } from 'react';
import { useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import './workSpace.css'
import TicketSpace from '../ticket/ticket';
import { useAppContext } from '../../AppProvider';
import { AiOutlineReconciliation, AiFillLayout, AiFillReconciliation, AiFillSetting } from "react-icons/ai";
import { ImExit } from "react-icons/im";


//component externes
import Dashboard from '../dashboard/dashboard';

function WorkSpace() {
    //componente para el espacio de trabajo del usuario authetificado
    // aqui puede crear un ticket y ver la lista ticket creados, los cerrados y los abiertos

    const navigate = useNavigate()

    const { userState, usuario, dispatch } = useAppContext()
   
    const [selectMenu, setSelectMenu] = useState(0) //valiable para resaltar el menu seleccionado

    const [scrollHeight, setScrollHeight] = useState(0); //variable del position

    let handleScroll = () => {
        //funcion para conocer el valor del scroll vertical
        const position = window.scrollY;
        setScrollHeight(position);
    };


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);//manejo del evento escroll, 

        //function de redireccionamiento de usuarios no authenticados
        if (userState) {
            console.log(userState)
            navigate('/')
        } else {
            navigate('/auth/login')
        }

    }, [userState, scrollHeight])

    const logout = () => {
        dispatch({
            type: "LOGOUT",
            value: { "login": false }
        })
    }
    return (
        <div className="workSpace-container">

            <div className="barra-lateral-container">
                <div className="menu-lateral">

                    <div onClick={() => setSelectMenu(0)}
                        className={selectMenu == 0 ? 'items-select' : 'items-menu'}>
                        <span className='icon'><AiFillLayout /></span>
                        Accueil
                    </div>

                    <div onClick={() => setSelectMenu(1)}
                        className={selectMenu == 1 ? 'items-select' : 'items-menu'}>
                        <span className='icon'><AiFillReconciliation /></span>
                        Tickets
                    </div>

                    <div onClick={() => setSelectMenu(2)}
                        className={selectMenu == 2 ? 'items-select' : 'items-menu'}>
                        <span className='icon'><AiFillSetting /></span>
                        Advancé
                    </div>
                </div>

                <div onClick={logout} className="">
                    <hr />
                    <div className="salir">
                        <span className='icon'><ImExit /></span>
                        Quiter
                    </div>

                </div>

            </div>

            <div className="personal-items-container">
                {selectMenu == 0 ? 'none disponible' : ''}
                {selectMenu == 1 ? <TicketSpace isScrolling={scrollHeight}/> : ''}
                {selectMenu == 2 ? 'none disponible' : ''}
	    
            </div>
        </div>
    )
}

export default WorkSpace;
