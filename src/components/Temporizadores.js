import React, { Component } from 'react';
import plusicon from '../assets/plus.svg';

import Swal from 'sweetalert2';
import './css/Temporizadores.css';
export class Temporizadores extends Component {
    state = {
        temporizadores : [],
        categorias : []
    }

    componentDidMount = () => {
        this.loadTimers();
        this.loadCategories();
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

    loadCategories = () => {
        /*
            #2 (GIO) TO (GUTI/SERGIO) ->
            Resumen: Prepara el método para cargar las
                     categorias almacenados en la BBDD.
        */
        this.setState({
            categorias : [
                {
                    idcategoria : 1,
                    categoria : "CATEGO_1",
                    duracion : "00:15"
                },
                {
                    idcategoria : 2,
                    categoria : "CATEGO_2",
                    duracion : "00:05"
                },
                {
                    idcategoria : 3,
                    categoria : "CATEGO_3",
                    duracion : "00:30"
                }
            ]
        });
    }

    getOptionsCategories = (idcategoria) => {
        var auxiliar = '';
        this.state.categorias.forEach((catego) => {
            auxiliar += '<option value="' + catego.idcategoria + '" ';

            if (idcategoria !== -1) {
                if (catego.idcategoria === idcategoria) {
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
                    idtimer : 1000, // Entiendo que todos los id son autogenerados????
                    inicio : result.value[0],
                    idcategoria : result.value[1],
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
        new Swal({
            title: 'Modificar temporizador',
            html:
                '<label for="swal-input1">Hora de inicio</label></br>' +
                '<input type="time" id="swal-input1" class="swal2-input" style="margin-top:5px;" value="' + 
                this.state.temporizadores[index].inicio + 
                '"/></br>' +
                '<p id="error_1" style="display:none; color:red;">Por favor, inserte una hora válida</p></br>' +
                '<label for="swal-input2">Categoría</label></br>' +
                '<select  id="swal-input2" class="swal2-input" style="margin-top:5px; width:70%;" value="2">' + 
                this.getOptionsCategories(this.state.temporizadores[index].idcategoria) + 
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
                    #4 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para agregar el temporizador modificado en la BBDD.
                */
                var newTimer = {
                    idtimer : 1000, // Se le pasa su propio ID o da igual????
                    inicio : result.value[0],
                    idcategoria : result.value[1],
                    pausa : false // No necesario
                }
                var auxiliar = this.state.temporizadores;
                    auxiliar.fill(newTimer, index, index+1);
                this.setState({
                    temporizadores : auxiliar
                })
            }
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
                                    <div className='box_temporizador_target_time_init noselect'>
                                        <p className='target_text'>{tempo.inicio}</p>
                                    </div>
                                    <div className='box_temporizador_target noselect'>
                                        <p className='target_text'>{tempo.idcategoria}</p>
                                    </div>
                                    <div className='box_temporizador_target_time_end noselect'>
                                        <p className='target_text'>{tempo.inicio}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='box_temporizador' onClick={() => this.generateTimer()}>
                        <div></div> {/* No tocar */}
                        <img src={plusicon} alt="Icono más" className='plusicon noselect'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Temporizadores;