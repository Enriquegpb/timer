import React, { Component } from 'react';
import plusicon from '../assets/plus.svg';

import Swal from 'sweetalert2';
import service from '../services/service';
import './css/Temporizadores.css';
export class Temporizadores extends Component {
    currentService = new service();
    state = {
        temporizadores : [],
        categorias : [],
        token : false
    }

    componentDidMount = () => {
        this.loadTimers();
        this.loadCategories();
        this.setState({
            token : (localStorage.getItem("token") !== null)
        });
    }

    loadTimers = () => {
        this.currentService.getTemporizadores().then((result_temporizadores) => {
            result_temporizadores.sort(function (a, b) {
                return a.inicio.substring(a.inicio.length - 8).localeCompare(b.inicio.substring(a.inicio.length - 8));
            }); // Se han ordenado los timers por hora más temprana -> hora más tarde
            this.setState({
                temporizadores : result_temporizadores
            });
        });
    }

    loadCategories = () => {
        this.currentService.getCategorias().then((result_categorias) => {
            this.setState({
                categorias : result_categorias
            });
        });
    }

    getOptionsCategories = (idCategoria) => {
        var auxiliar = '';
        this.state.categorias.forEach((catego) => {
            auxiliar += '<option value="' + catego.idCategoria + '" ';

            if (idCategoria !== -1) {
                if (catego.idCategoria === idCategoria) {
                    auxiliar += 'selected';
                }
            }

            auxiliar += '>' + 
                            catego.categoria +
                        '</option>';
        })
        return auxiliar;
    }

    generateTimer = () => {
        new Swal({
            title: 'Nuevo temporizador',
            html:
                '<label for="swal-input1">Hora de inicio</label></br>' +
                '<input type="time" id="swal-input1" class="swal2-input" style="margin-top:5px;"/></br>' +
                '<p id="error_1" style="display:none; color:red;">Por favor, inserte una hora válida</p></br>' +
                '<label for="swal-input2">Categoría</label></br>' +
                '<select  id="swal-input2" class="swal2-input" style="margin-top:5px; width:70%;">' + 
                this.getOptionsCategories(-1) + 
                '</select>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: '#2C4D9E',
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                if (document.getElementById('swal-input1').value === "") {
                    document.getElementById('error_1').style.display = 'inline-block';
                    return false;
                } else {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ]
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result);
                /*
                    #3 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para agregar el nuevo temporizador en la BBDD.
                */
                var newTimer = {
                    idTemporizador : 1000, // Entiendo que todos los id son autogenerados????
                    inicio : result.value[0],
                    idCategoria : result.value[1],
                    pausa : false // No necesario
                }
                var auxiliar = this.state.temporizadores;
                    auxiliar.push(newTimer);
                this.setState({
                    temporizadores : auxiliar
                })
            }
        });
    }

    modifyTimer = (index) => {
        if (this.state.token) {
            new Swal({
                title: 'Modificar temporizador',
                html:
                    '<label for="swal-input1">Hora de inicio</label></br>' +
                    '<input type="time" id="swal-input1" class="swal2-input" style="margin-top:5px;" value="' + 
                    this.state.temporizadores[index].inicio + 
                    '"/></br>' +
                    '<p id="error_1" style="display:none; color:red;">Por favor, inserte una hora válida</p></br>' +
                    '<label for="swal-input2">Categoría</label></br>' +
                    '<select  id="swal-input2" class="swal2-input" style="margin-top:5px; width:70%;">' + 
                    this.getOptionsCategories(this.state.temporizadores[index].idCategoria) + 
                    '</select>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#2C4D9E',
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                    if (document.getElementById('swal-input1').value === "") {
                        document.getElementById('error_1').style.display = 'inline-block';
                        return false;
                    } else {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value
                        ]
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    /*
                        #4 (GIO) TO (GUTI/SERGIO) ->
                        Resumen: Prepara esta zona para agregar el temporizador modificado en la BBDD.
                    */
                    var newTimer = {
                        idTemporizador : 1000, // Se le pasa su propio ID o da igual????
                        inicio : result.value[0],
                        idCategoria : Number.parseInt(result.value[1]),
                        pausa : false // No necesario
                    }
                    var auxiliar = this.state.temporizadores;
                        auxiliar.fill(newTimer, index, index+1);
                    this.setState({
                        temporizadores : auxiliar
                    }, () => {
                        // console.log(JSON.stringify(this.state.temporizadores));
                    })
                }
            });
        }
    }
    
    getNameCategory = (idCategoria) => {
        var res = "";
        this.state.categorias.forEach(element => {
            if (element.idCategoria === idCategoria) {
                res = element.categoria;
            }
        });
        return res;
    }

    getInicio = (string_init) => {
        var time = new Date(string_init);
        var time_string = time.toTimeString().split(' ')[0];
        return time_string.substring(0, time_string.length - 3);
    }

    getFinal = (idcat, inicio) => {
        var res = "";
        if (this.state.categorias) {
            var inicio_min = this.transformDuration(this.getInicio(inicio));
            this.state.categorias.forEach(element => {
                if (element.idCategoria === idcat) {
                    inicio_min += element.duracion;
                    res = this.transformMinutes(inicio_min);
                }
            });
        }
        return res;
    }

    transformDuration = (duration) => { // Pasar de 01:15 a 75 (min - integer)
        var time = duration.split(":");
        var hours = Number.parseInt(time[0]);
        var minutes = Number.parseInt(time[1]);
        if (hours > 0) {
            hours = hours * 60;
        }
        return hours + minutes;
    }

    transformMinutes = (duracion, legend) => { // Pasar de 75 a 01:15 (string)
        if (duracion === 60) {
            return (legend)? "1h" : "01:00";
        } else if(duracion < 60) {
            return (legend)? (duracion + " min") : ("00:" + duracion.toString().padStart(2,0));
        } else {
            var hours = Math.floor(duracion / 60);  
            var minutes = duracion % 60;
            return (legend)? (hours + " h " + minutes + " min") : (hours.toString().padStart(2,0) + ":" + minutes.toString().padStart(2,0));  
        }
    }

    render() {
        return (
            <div>
                <h1 className='timer_title noselect'>TEMPORIZADORES</h1>
                <div className='content_box'>
                    {
                        this.state.temporizadores.map((tempo, index) => {
                            return (
                                <div className='box_temporizador' key={index} onClick={() => this.modifyTimer(index)}>
                                    <div className='box_temporizador_target_time_init noselect'>
                                        <p className='target_text'>{this.getInicio(tempo.inicio)}</p>
                                    </div>
                                    <div className='box_temporizador_target noselect'>
                                        <p className='target_text'>{this.getNameCategory(tempo.idCategoria)}</p>
                                    </div>
                                    <div className='box_temporizador_target_time_end noselect'>
                                        <p className='target_text'>{this.getFinal(tempo.idCategoria, tempo.inicio)}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        this.state.token && (
                            <div className='box_temporizador' onClick={() => this.generateTimer()}>
                                <div></div> {/* No tocar */}
                                <img src={plusicon} alt="Icono más" className='plusicon noselect'/>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Temporizadores;