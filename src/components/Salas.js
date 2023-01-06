import React, { Component } from 'react';
import './css/Salas.css';

import Swal from 'sweetalert2';
import service from '../services/service';

import plusicon from '../assets/plus.svg';

export class Salas extends Component {
    currentService = new service();
    state = {
        salas : [],
        token : false
    }

    componentDidMount = () => {
        this.loadRooms();
        this.setState({
            token : (localStorage.getItem("token") !== null)
        });
    }

    loadRooms = () => {
        this.currentService.getSalas().then((result) => {
            this.setState({
                salas : result
            });
        });
    }

    generateRoom = () => {
        Swal.fire({
            title: 'Nueva sala',
            input: 'text',
            inputLabel: 'Inserte un nuevo nombre para la sala',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#2C4D9E",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe añadir contenido para crear una nueva sala';
                } else {
                    var auxiliar = this.state.salas;
                    var correcto = true;
                    auxiliar.forEach(element => {
                        if (value.toUpperCase() === element.nombreSala.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una sala con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.currentService.postSala(result.value).then(result_2 => {
                    Swal.fire(
                        'Sala creada',
                        'Se ha creado la nueva sala en la Base de datos\n(code: x' + result_2.status + ")",
                        'success'
                    );
                    this.loadRooms();
                });
            }
        });
    }

    modifyRoom = (index) => {
        if (this.state.token) {
            var currentName = this.state.salas[index].nombreSala;
            Swal.fire({
                title: 'Modificar sala',
                input: 'text',
                inputLabel: 'Nombre',
                inputValue: currentName,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar sala",
                confirmButtonColor: "#2C4D9E",
                denyButtonText: "Eliminar sala",
                denyButtonColor: "#FF0000",
                cancelButtonText: "Cancelar",
                inputValidator: (value) => {
                    if (!value) {
                        return 'El nuevo nombre de la sala no debe estar en blanco';
                    } else {
                        var auxiliar = this.state.salas;
                        var correcto = true;
                        if (currentName.toUpperCase() !== value.toUpperCase()) {
                            auxiliar.forEach(element => {
                                if (value.toUpperCase() === element.nombreSala.toUpperCase()) {
                                    correcto = false;       
                                }
                            });                        
                        }
                        if (!correcto) { return 'Ya existe una sala con el mismo nombre' };
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) { // Modificación de la sala
                    if (currentName.toUpperCase() !== result.value.toUpperCase()) {
                        this.currentService.putSala(this.state.salas[index].idSala, result.value).then(result_3 => {
                            Swal.fire(
                                'Sala modificada',
                                'Se ha modificado la sala en la Base de datos\n(code: x' + result_3.status + ")",
                                'success'
                            );
                            this.loadRooms();
                        });
                    }
                }
                if (result.isDenied) { // Eliminación de la sala 
                    this.currentService.deleteSala(this.state.salas[index].idSala).then(result_4 => {
                        Swal.fire(
                            'Sala eliminada',
                            'Se ha eliminado la sala de la Base de datos\n(code: x' + result_4.status + ")",
                            'success'
                        );
                        this.loadRooms();
                    })
                }
            });  
        }
    }

    render() {
      return (
            <div>
                <h1 className='timer_title'>SALAS</h1>
                <div className='content_box'>
                    {
                        this.state.salas.map((sala, index) => {
                            return (
                                <div className='box_sala scroll' key={index} onClick={() => this.modifyRoom(index)}>
                                    <p className='box_sala_target noselect'>
                                        {sala.nombreSala}
                                    </p>
                                </div>
                            )
                        })
                    }
                    {
                        this.state.token && (
                            <div className='box_sala last_item' onClick={() => this.generateRoom()}>
                                <p className='box_sala_target noselect'>
                                    <img src={plusicon} alt="Icono más" className='plusicon'/>
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
      )
    }
}

export default Salas;