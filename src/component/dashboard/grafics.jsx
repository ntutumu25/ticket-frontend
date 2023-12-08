import React from "react";
import { Chart } from "react-google-charts"; //importacion del modulo de graficos Chart


function GraficsDashboard() {

    const data = [
        ["Ticket", "Tous", "Fermé", "Ouverts"],
        ["ADMIN", 100, 30, 70],
        ["IRE-IGC", 30, 10, 20],
        ["ENA-METEO", 10, 6, 4],
        ["SLI", 40, 10, 20],

    ];


    const options = {
        title: "Status Generale des tickets",
        chartArea: { width: "50%" },
        hAxis: {
            title: "Nº ickets",
            minValue: 0,
        },
        vAxis: {
            title: "Service",

        },
        colors: ["blue", 'LawnGreen', 'red'],
        backgroundColor: 'none'

    };


    return (
        <div>

            <Chart
                chartType="BarChart"
                width="60%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    );
}

export default GraficsDashboard;