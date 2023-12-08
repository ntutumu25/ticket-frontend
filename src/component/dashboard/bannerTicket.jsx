import React  from "react";



function BannerTicket(){

    return(
        <div className="row banner-container">
            <div className="col-lg-2 col-ml-12 caja-info">
                <h5>Tous les Tickets</h5>
                <h6 className="text-danger">100</h6>
            </div>
            <div className="col-lg-2 col-ml-12 caja-info">
                <h5>Tickets Ouverts</h5>
                <h6>50</h6>
            </div>
            <div className="col-lg-2 col-ml-12 caja-info">
                <h5>Tickets Fermés</h5>
                <h6>90</h6>
            </div>
            <div className="col-lg-2 col-ml-12 caja-info">
                <h5>Vos Tickets</h5>
                <h6>0</h6>
            </div>
        </div>
    )
}



export default BannerTicket;