import React, { useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import './dashboard.css'
import { useAppContext } from '../../AppProvider';
import BannerTicket from './bannerTicket';
import GraficsDashboard from './grafics';




function Dashboard() {

    //componente principal dashboard

    const { usuario } = useAppContext()
    const navigate = useNavigate()


    



    return (
        <div className="mt-3 container-fluid">

            <div className="row">
                <div className="col-lg-5 col-ml-12">
                    <div className="alert alert-primary" role="alert">
                        <div className='image-logo-container'>
                            <div className='logo-container'>
                                <img src={process.env.PUBLIC_URL + '/download.png'} />
                            </div>
                            <div className='nombre-logo'>
                                <h3 className="alert-heading text-primary">  ASECNA</h3>
                                <h5 style={{ color: '#d4ac0d' }}>Représentation Auprès de la Guinée Equatoriale </h5>
                            </div>
                        </div>

                        <hr />
                        <h5 className="mb-0 text-dark">Site de Bata</h5>
                    </div>
                </div>

                <div className="col-lg-7 col-ml-12">
                    <div className="alert " role="alert">
                        <h3 className="alert-heading text-dark">Bienvenu à votre espace!</h3>
                        <h5 className="mb-0 text-primary">Géstion et suivi des tâches par Ticket</h5>
                        <hr />
                        <h5> 
                            {usuario.departamento == 'IRE-IGC' ? 'Unité Maintenance IRE/IGC' :
                             usuario.departamento=='CDT'?'ADMINISTRATION':
                             usuario.departamento=='ENA-MTEO'?'Unité ENA-MÉTÉO': 'Unité SLI'
                             }
                        </h5>

                    </div>
                </div>
            </div>

            <BannerTicket />
            <GraficsDashboard/>

            

        </div>
    )
}



export default Dashboard;