
import { useAppContext } from "../../AppProvider"
import './navbar.css'

function Navbar() {
    const { dispatch, usuario, userState} = useAppContext()

    return (
        <nav class="navbar barra-menu navbar-expand-lg bg-light">
            <div class="container-fluid menu-container">
                <div className="logo">
                    <a className="navbar-brand" href='#' >MBIA | Ticket</a>
                </div>
                <div className="info-nav">
                    <div style={{backgroundColor:`#B${Math.floor(Math.random() * 10) + 1}FF72`}} className={userState?'letra':'hidden'}>{userState?usuario.nombre[0].toUpperCase():''}</div>
                    <span>{userState?usuario.nombre.toUpperCase():''}</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;