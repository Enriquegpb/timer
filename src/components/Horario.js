import React, { Component } from 'react';
import './css/Horario.css';

import plusicon from '../assets/plus.svg';
import subicon from '../assets/sub.svg';

export class Horario extends Component {
    state = {
        temporizadores : null,
        salas : null,
        sala_actual : 0,
        edit_mode : false
    }

    componentDidMount = () => {
        this.loadRooms();
        this.loadTimers();
    }

    changeRoom = (index) => {
        var auxiliar = this.state.sala_actual + index;
        
        if (auxiliar < 0) {
            auxiliar = this.state.salas.length - 1;
        } 
        
        if (auxiliar >= this.state.salas.length) {
            auxiliar = 0;
        }

        this.setState({
            sala_actual : auxiliar
        });
    }

    loadRooms = () => {
        /*
            #1 (GIO) TO (ALL)
            Resumen: Necesito preparar este método para cargar todas las
                     salas creadas hasta este momento y almacenarlas
                     en el array del state. (Después sustituir el array 
                     de ejemplo por el correcto)
        */
        this.setState({
            salas : [
                {
                    idsala : 1,
                    sala : "Sala 1"
                },
                {
                    idsala : 2,
                    sala : "Sala 2"
                },
                {
                    idsala : 3,
                    sala : "Sala 3"
                },
                {
                    idsala : 4,
                    sala : "Sala 4"
                }
            ]     
        }, () => {
            this.changeRoom(0);
        });
    }

    loadTimers = () => {
        /*
            #2 (GIO) TO (ALL)
            Resumen: Necesito preparar este método para cargar todos los
                     temporizadores creados hasta este momento y almacenarlos
                     en el array del state. (Después eliminar el ejemplo de abajo)
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
                    idtimer : 2,
                    inicio : "08:45",
                    idcategoria : 2, // SUPONGAMOS QUE ES 'BREAK 5MIN'
                    pausa : false // No necesario
                },
                {
                    idtimer : 3,
                    inicio : "08:50",
                    idcategoria : 3, // SUPONGAMOS QUE ES 'LONG BREAK'
                    pausa : false // No necesario
                }
            ]
        });
    }

    /*
        #3 (GIO) TO (ALL)
        Resumen: ¿No se mantiene el orden al cargar los temporizadores verdad? 
                    Sería más cómodo tener el array ordenado por de más temprano
                    a más tarde, a través de su 'inicio'. Si es posible, crear otro método
                    que reordene dicho array.
    */

    getEnd = (idtimer) => {
        /*
            #4 (GIO) TO (ALL)
            Resumen: Necesito un método que calcule la hora de finalización
                        del timer. Se podría pasar el texto a objeto Time (milisegundos)
                        añadir la duración (también en milisegundos) y posteriormente
                        realizar el parse al formato hh:mm inicial.
        */
        return "09:45";
    }
    
    getCompany = (idtimer) => {
        /*
            #5 (GIO) TO (ALL)
            Resumen: Necesito un método que me devuelva el nombre de la empresa
                     asociada al timer pasado por parámetros. El idsala de la tabla
                     'tiempos_empresas_salas' de la que sacamos la referencia de la 
                     empresa, debe ser igual a la sala en la que nos encontramos, es
                     decir; debe ser igual al state sala_actual.
        */
       return "EMPRESA";
    }

    getCategory = (idtimer) => {
        /*
            #6 (GIO) TO (ALL)
            Resumen: Necesito un método que me devuelva el nombre de la categoría
                     asociada al timer pasado por parámetros.
        */
       return "CATEGORÍA";
    }

    checkTimeCompanyRooms = (idtimer) => {
        /*
            #7 (GIO) TO (ALL)
            Resumen: Necesito un método que busque en la tabla 'tiempos_empresas_salas'
                     un registro cuyo idtimer sea igual al pasado por parámetros y cuyo
                     idsala sea igual al que hay en la variable this.state.sala_actual.
                     En caso de que dicho registro exista, se devolverá true de lo contrario
                     se devolverá false. (Después eliminar el código de abajo, que lo utilizo de prueba)
        */
        if (idtimer === 1) {
            return true;
        } else {
            return false;
        }
    }

    changeMode = () => {
        this.setState({
            edit_mode : !this.state.edit_mode
        })
    }

    render() {
        return (
            <div>
                <h1 className='timer_title noselect'>HORARIO</h1>
                <button className='button_edit_schedule' onClick={() => this.changeMode()}>
                    Editar empresas
                </button>
                <div className='schedule_table_box'>
                    <table className='schedule_table noselect'>
                        <thead>
                            <tr className='schedule_header'>
                                <th></th>
                                <th colSpan={4}>
                                    <button className='schedule_buttons_rooms' onClick={() => this.changeRoom(-1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                        </svg>
                                    </button>
                                    {
                                        this.state.sala_actual >= 0 && this.state.salas && (
                                            this.state.salas[this.state.sala_actual].sala
                                        )
                                    }
                                    <button className='schedule_buttons_rooms' onClick={() => this.changeRoom(1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.temporizadores && this.state.salas && (
                                    this.state.temporizadores.map((tempo, index) => {
                                        var check = this.checkTimeCompanyRooms(tempo.idtimer);
                                        var catcolspan = check ? 1 : 2;
                                        return (
                                            <tr key={index}>
                                                <td>{tempo.inicio}<br/>{this.getEnd(tempo.idtimer)}</td>
                                                {
                                                    this.state.edit_mode ? (
                                                        <td className='schedule_col scroll' colSpan={2}>
                                                            {
                                                                check ? (
                                                                    <div className='company_edit_box'>
                                                                        <button className='company_edit_box_target_sub'>
                                                                            <img src={subicon} className="addsub_icon" alt="Icono restar"/>
                                                                        </button>
                                                                        <div className='company_edit_box_target scroll'>
                                                                            <p className="target_text">
                                                                                {this.getCompany(tempo.idtimer)}eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                                                                            </p>
                                                                        </div>
                                                                        <div className='inactive'>
                                                                            <img src={plusicon} className="addsub_icon" alt="Icono añadir"/>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className='company_edit_box'>
                                                                        <div className='inactive'>
                                                                            <img src={subicon} className="addsub_icon" alt="Icono restar"/>
                                                                        </div>
                                                                        <div className='company_edit_box_target scroll'>
                                                                            <p className="target_text">
                                                                                -
                                                                            </p>
                                                                        </div>
                                                                        <button className='company_edit_box_target_add'>
                                                                            <img src={plusicon} className="addsub_icon" alt="Icono añadir"/>
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }
                                                        </td>
                                                    ) : (
                                                        check && (
                                                            <td className='schedule_col scroll'>
                                                                {this.getCompany(tempo.idtimer)}
                                                            </td>
                                                        )
                                                    )
                                                }
                                                {
                                                    !this.state.edit_mode && (
                                                        <td colSpan={catcolspan} className='schedule_col scroll'>
                                                            {this.getCategory(tempo.idtimer)}
                                                        </td>    
                                                    )
                                                }
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Horario;