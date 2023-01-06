import React, { Component } from 'react';
import './css/Horario.css';

import Swal from 'sweetalert2';

import plusicon from '../assets/plus.svg';
import subicon from '../assets/sub.svg';
import Global from '../Global';
import axios from 'axios';

export class Horario extends Component {
    state = {
        temporizadores : null,
        empresas : null,
        tiempos_empresas_salas : null,
        salas : null,
        sala_actual : 0,
        edit_mode : false
    }
    loadCompanies = () => {
        var request = "/api/Empresas";
        var url = Global.url + request;
        console.log(url, request)
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({
                empresas : res.data
            });
            console.log("empresas almacenadas");
        });
        
    }
    loadTimers = () => {
        var request = "/api/Timers";
        var url = Global.url + request;
        console.log(url, request)
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({
                temporizadores : res.data
            });
            console.log("Timers almacenadas");
        });
        
    }
    
    loadRooms = () => {
        var request = "/api/Timers";
        var url = Global.url + request;
        console.log(url, request)
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({
                salas : res.data
            }, () => {
                this.changeRoom(0);
            });
        });
        
    }
    loadTiemposEmpresasSalas = () => {
        var request = "/api/TiempoEmpresa";
        var url = Global.url + request;
        console.log(url, request)
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({
                tiempos_empresas_salas : res.data
            });
        });
        
    }
    componentDidMount = () => {
        this.loadRooms();
        this.loadTimers();
        this.loadCompanies();
        this.loadTiemposEmpresasSalas();
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

    /*
        #4 (GIO) TO (ALL)
        Resumen: ¿No se mantiene el orden al cargar los temporizadores verdad? 
                    Sería más cómodo tener el array ordenado por de más temprano
                    a más tarde, a través de su 'inicio'. Si es posible, crear otro método
                    que reordene dicho array.
    */

    getEnd = (idtimer) => {
        /*
            #5 (GIO) TO (ALL)
            Resumen: Necesito un método que calcule la hora de finalización
                        del timer. Se podría pasar el texto a objeto Time (milisegundos)
                        añadir la duración (también en milisegundos) y posteriormente
                        realizar el parse al formato hh:mm inicial.
        */
        return "09:45";
    }
    
    getCompany = (idtimer) => {
        /*
            #6 (GIO) TO (ALL)
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
            #7 (GIO) TO (ALL)
            Resumen: Necesito un método que me devuelva el nombre de la categoría
                     asociada al timer pasado por parámetros.
                     
        */
       return "CATEGORÍA";
    }

    checkTimeCompanyRooms = (idtimer) => {
        /*
            #8 (GIO) TO (ALL)
            Resumen: Necesito un método que busque en la tabla 'tiempos_empresas_salas'
                     un registro cuyo idtimer sea igual al pasado por parámetros y cuyo
                     idsala sea igual al que hay en la variable this.state.salas[this.state.sala_actual].idsala.
                     En caso de que dicho registro exista, se devolverá true, de lo contrario
                     se devolverá false. (Después eliminar el código de abajo, que lo utilizo de prueba)
        */
        var existe = false;
        this.state.tiempos_empresas_salas.forEach(element => {
            if (element.idtimer === idtimer && element.idsala === this.state.salas[this.state.sala_actual].idsala) {
                existe = true;
            }
        });
        return existe;
    }

    changeMode = () => {
        this.setState({
            edit_mode : !this.state.edit_mode
        }, () => {
            document.getElementById("button_edit_schedule").innerText = (this.state.edit_mode) ? "Volver" : "Editar empresas";
        })
    }

    getOptionsCompanies = () => {
        var auxiliar = '';
        this.state.empresas.forEach((company) => {
            auxiliar += '<option value="' + company.idempresa + '">' + 
                            company.empresa +
                        '</option>';
        })
        return auxiliar;
    }

    createTimer = (index) => {
        new Swal({
            title: 'Asignar empresa',
            html:
                '<label for="swal-input1">Empresa</label></br>' +
                '<select  id="swal-input1" class="swal2-input" style="margin-top:5px; width: 70%;">' + 
                    this.getOptionsCompanies() + 
                '</select>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: '#2C4D9E',
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value
                ]
            }
        }).then((result) => {
            if (result.isConfirmed) {
                var newRegister = {
                    idtimer : this.state.temporizadores[index].idtimer,
                    idempresa : Number.parseInt(result.value[0]),
                    idsala : this.state.salas[this.state.sala_actual].idsala,
                    idevento : 0
                }
                new Swal({
                    title: '¿Datos correctos?',
                    text: JSON.stringify(newRegister),
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, guardar',
                    cancelButtonText: 'No, cancelar'
                }).then((subresult) => {
                    if (subresult.isConfirmed) {
                        var auxiliar = this.state.tiempos_empresas_salas;
                        auxiliar.push(newRegister);
                        this.setState({
                            tiempos_empresas_salas : auxiliar
                        });
                    }
                });
            }
        });
    }

    deleteTimer = (idtimer) => {
        /*
            #9 (GIO) TO (ALL)
            Resumen: Necesito un método que elimine en la tabla 'tiempos_empresas_salas'
                     un registro cuyo idtimer sea igual al pasado por parámetros y cuyo
                     idsala sea igual al que hay en la variable this.state.salas[this.state.sala_actual].idsala
        */
        var position = -1;
        this.state.tiempos_empresas_salas.forEach((element, index) => {
            if (element.idtimer === idtimer && element.idsala === this.state.salas[this.state.sala_actual].idsala) {
                position = index;
            }    
        });

        new Swal({
            title: 'Quitar empresa',
            text: "Se eliminará la empresa del timer seleccionado. Solo verá la categoría, hasta añadir una nueva empresa",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                var auxiliar = this.state.tiempos_empresas_salas;
                auxiliar.splice(position, 1);
                this.setState({
                    tiempos_empresas_salas : auxiliar
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h1 className='timer_title noselect'>HORARIO</h1>
                <button id="button_edit_schedule" className='button_edit_schedule' onClick={() => this.changeMode()}>
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
                                                                        <button className='company_edit_box_target_sub' onClick={() => this.deleteTimer(tempo.idtimer)}>
                                                                            <img src={subicon} className="addsub_icon" alt="Icono restar"/>
                                                                        </button>
                                                                        <div className='company_edit_box_target scroll'>
                                                                            <p className="target_text">
                                                                                {this.getCompany(tempo.idtimer)}
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
                                                                        <button className='company_edit_box_target_add' onClick={() => this.createTimer(index)}>
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