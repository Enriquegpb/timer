import React, { Component } from 'react';
import plusicon from '../assets/plus.svg';

import Swal from 'sweetalert2';
import './css/Temporizadores.css';
export class Temporizadores extends Component {
    state = {
        temporizadores : []
    }

    componentDidMount = () => {
        this.loadTimers();
    }

    loadTimers = () => {
        /*
            #1 (GIO) TO (GUTI/SERGIO) ->
            Resumen: Prepara el método para cargar los
                     temporizadores almacenados en la BBDD.
        */
            this.setState({
                temporizadores : [
                    {
                        idtimer : 1,
                        inicio : "08:30",
                        idcategoria : 1, // SUPONGAMOS QUE ES 'WORK'
                        pausa : false // No necesario
                    },
                    {
                        idtimer : 1,
                        inicio : "08:45",
                        idcategoria : 2, // SUPONGAMOS QUE ES 'BREAK 5MIN'
                        pausa : false // No necesario
                    },
                    {
                        idtimer : 1,
                        inicio : "08:50",
                        idcategoria : 3, // SUPONGAMOS QUE ES 'LONG BREAK'
                        pausa : false // No necesario
                    }
                ]
            });
    }

    render() {
        return (
            <div>
                <h1 className='timer_title'>TEMPORIZADORES</h1>
                <div className='content_box'>
                    {
                        this.state.temporizadores.map((tempo, index) => {
                            return (
                                <div className='box_temporizador' key={index} onClick={() => this.modifyTimer(index)}>
                                    <div className='box_temporizador_target_time_init'>
                                        <p className='target_text'>{tempo.inicio}</p>
                                    </div>
                                    <div className='box_temporizador_target noselect'>
                                        <p className='target_text'>{tempo.idcategoria}</p>
                                    </div>
                                    <div className='box_temporizador_target_time_end'>
                                        <p className='target_text'>{tempo.inicio}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='last_item' onClick={() => this.generateTimer()}>
                        <img src={plusicon} alt="Icono más" className='plusicon noselect'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Temporizadores;