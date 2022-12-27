import React, { Component } from 'react';

import './css/Horario.css';

export class Horario extends Component {
    state = {
        temporizadores : [
            {
                sala : "SALA 1",
                empresa : "EMPRESA DE PEGA 1",
                hora_inicio : "08:30",
                duracion : "00:15"
            },
            {
                sala : "SALA 1",
                empresa : "EMPRESA DE PEGA 2",
                hora_inicio : "08:45",
                duracion : "00:05"
            },
            {
                sala : "SALA 1",
                empresa : "EMPRESA DE PEGA 3",
                hora_inicio : "08:50",
                duracion : "00:15"
            }
        ]
    }

    getEnd = (hora_inicio, duracion) => {
        /*
            #1 (GIO) TO (ALL)
            Resumen: Necesito un método que calcule la hora de finalización
                     del timer. Se podría pasar el texto a objeto Time (milisegundos)
                     añadir la duración (también en milisegundos) y posteriormente
                     realizar el parse al formato hh:mm inicial.
        */
       return "09:45";
    }

    render() {
        return (
            <div>
                <h1 className='timer_title'>HORARIO</h1>
                <div className='schedule_table_box'>
                    <table className='schedule_table'>
                        <thead>
                            <tr className='schedule_header'>
                                <th colSpan={2}>SALA 1</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.temporizadores.map((tempo, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {tempo.hora_inicio} <br/> {this.getEnd()}
                                            </td>
                                            <td>
                                                {tempo.empresa}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Horario;