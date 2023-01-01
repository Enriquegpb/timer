import React, { Component } from 'react';
import './css/Salas.css';

import Swal from 'sweetalert2';

import plusicon from '../assets/plus.svg';

export class Salas extends Component {
    state = {
        salas : []
    }

    componentDidMount = () => {
        this.loadRooms();
    }

    loadRooms = () => {
        /*
            #1 (GIO) TO (SERGIO) ->
            Resumen: Prepara el método para cargar las
            salas almacenadas en la BBDD.
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
            ]
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
                        if (value.toUpperCase() === element.sala.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una sala con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                /*
                    #2 (GIO) TO (SERGIO) ->
                    Resumen: Prepara esta zona para agregar la nueva sala en la BBDD.
                */
                var newRoom = {
                    idsala : this.state.salas,
                    sala : result.value
                }

                var auxiliar = this.state.salas;
                    auxiliar.push(newRoom);
                this.setState({
                    salas : auxiliar
                });
            }
        });
    }

    modifyRoom = (index) => {
        var currentName = this.state.salas[index].sala;
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
                            if (value.toUpperCase() === element.sala.toUpperCase()) {
                                correcto = false;       
                            }
                        });                        
                    }
                    if (!correcto) { return 'Ya existe una sala con el mismo nombre' };
                }
            }
        }).then((result) => {
            var auxiliar = this.state.salas;
            if (result.isConfirmed) {
                /*
                    #3 (GIO) TO (SERGIO) ->
                    Resumen: Prepara esta zona para actualizar la sala en la BBDD.
                */
                var newRoom = {
                    idsala : this.state.salas[index].idsala,
                    sala : result.value
                }

                auxiliar.fill(newRoom, index, index+1);
                this.setState({
                    salas : auxiliar
                });
            }
            if (result.isDenied) {
                    auxiliar.splice(index, 1);
                this.setState({
                    salas : auxiliar
                });
            }
        });
    }

    render() {
      return (
            <div>
                <h1 className='timer_title'>SALAS</h1>
                <div className='content_box'>
                    {
                        this.state.salas.map((sala, index) => {
                            return (
                                <div className='box_sala' key={index} onClick={() => this.modifyRoom(index)}>
                                    <p className='box_sala_target noselect'>
                                        {sala.sala}
                                    </p>
                                </div>
                            )
                        })
                    }
                    <div className='box_sala last_item' onClick={() => this.generateRoom()}>
                        <p className='box_sala_target noselect'>
                            <img src={plusicon} alt="Icono más" className='plusicon'/>
                        </p>
                    </div>
                </div>
            </div>
      )
    }
}

export default Salas;