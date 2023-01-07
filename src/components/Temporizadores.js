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
                var newTimer = {
                    idTemporizador : 0,
                    inicio : "2023-01-07T" + result.value[0] +":00",
                    idCategoria : result.value[1],
                    pausa : false
                }
                var counter = 0, correcto = true;
                var tcompare_init = this.transformDuration(this.getInicio(newTimer.inicio));
                var tcompare_end = this.transformDuration(this.getFinal(Number.parseInt(newTimer.idCategoria), newTimer.inicio));
                if (this.state.temporizadores.length === 0) {
                    this.currentService.postTemporizador(newTimer).then(() => {
                        Swal.fire(
                            'Temporizador creado',
                            'Se ha creado el nuevo temporizador en la base de datos',
                            'success'
                        );
                        this.loadTimers();
                    }); 
                } else {
                    this.state.temporizadores.forEach((tempo) => {
                        counter ++; // Esta variable avisará a la función asyn. para que se ejecute cuando termine el forEach
                        var init = this.transformDuration(this.getInicio(tempo.inicio));                    // Inicio en int
                        var end = this.transformDuration(this.getFinal(tempo.idCategoria, tempo.inicio));   // Final en int
    
                        // CASOS NO COMPATIBLES ================================================================
                        if (tcompare_init === init) { correcto = false; }                        // Mismo inicio
                        if (tcompare_init > init && tcompare_init < end) { correcto = false; }   // Valor entre otro rango
                        if (tcompare_end > init && tcompare_end <= end) { correcto = false; }    // Valor entre otro rango
    
                        if (counter === this.state.temporizadores.length) { // Se ejecuta el post al acabar el recorrido de timers
                            if (correcto) { // En este caso no hay conflicto con otros timers
                                this.currentService.postTemporizador(newTimer).then(() => {
                                    Swal.fire(
                                        'Temporizador creado',
                                        'Se ha creado el nuevo temporizador en la base de datos',
                                        'success'
                                    );
                                    this.loadTimers();
                                });                                                            
                            } else { // Existe conflicto con otros timers (Mismo init o valor entre rangos)
                                Swal.fire(
                                    'Hora no válida',
                                    'En la hora proporcionada por el usuario ya existe otro temporizador activo',
                                    'error'
                                );
                            }
                        }
                    });
                }
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
                    this.getInicio(this.state.temporizadores[index].inicio) + 
                    '"/></br>' +
                    '<p id="error_1" style="display:none; color:red;">Por favor, inserte una hora válida</p></br>' +
                    '<label for="swal-input2">Categoría</label></br>' +
                    '<select  id="swal-input2" class="swal2-input" style="margin-top:5px; width:70%;">' + 
                    this.getOptionsCategories(this.state.temporizadores[index].idCategoria) + 
                    '</select>',
                focusConfirm: false,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar temporizador",
                confirmButtonColor: "#2C4D9E",
                denyButtonText: "Eliminar temporizador",
                denyButtonColor: "#FF0000",
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
                if (result.isConfirmed) { // Modificar temporizador
                    var newTimer = {
                        idTemporizador : this.state.temporizadores[index].idTemporizador,
                        inicio : "2023-01-18T" + result.value[0] +":00",
                        idCategoria : result.value[1],
                        pausa : false
                    }
                    this.currentService.putTemporizador(newTimer).then(() => {
                        Swal.fire(
                            'Temporizador modificado',
                            'Se ha modificado el temporizador de la base de datos',
                            'success'
                        );
                        this.loadTimers();
                    });
                }
                if (result.isDenied) { // Eliminar temporizador
                    Swal.fire({
                        title: '¿Estás segur@?',
                        text: "Al eliminar este temporizador también se eliminarán los registros de empresas asignadas al mismo",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#2C4D9E',
                        cancelButtonColor: '#FF0000',
                        confirmButtonText: 'Sí, estoy segur@',
                        cancelButtonText: 'No, cancelar'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            var currentID = this.state.temporizadores[index].idTemporizador;
                            this.currentService.getTES().then((result_tes) => {
                                result_tes.forEach(registro => {
                                    if (registro.idTimer === currentID) {
                                        this.currentService.deleteTES(registro.id);
                                    }
                                });
                            });
                            this.currentService.deleteTemporizador(currentID).then(() => {
                                Swal.fire(
                                    'Temporizador eliminado',
                                    'Se ha eliminado el temporizador de la base de datos',
                                    'success'
                                );
                                this.loadTimers();
                            });
                        }
                    });
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