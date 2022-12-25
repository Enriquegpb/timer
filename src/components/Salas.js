import React, { Component } from 'react';
import './css/Salas.css';

import Swal from 'sweetalert2';

import Menu from './Menu';
import plusicon from '../assets/plus.svg';

export class Salas extends Component {

    state = {
        salas : ["pepe","juan"]
    }

    generateRoom = () => {
        Swal.fire({
            title: 'Nueva sala',
            input: 'text',
            inputLabel: 'Inserte un nuevo nombre para la sala',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe añadir contenido para crear una nueva sala';
                } else {
                    var auxiliar = this.state.salas;
                    var correcto = true;
                    auxiliar.forEach(element => {
                        if (value.toUpperCase() === element.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una sala con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                var auxiliar = this.state.salas;
                    auxiliar.push(result.value);
                this.setState({
                    salas : auxiliar
                })
                console.log(this.state.salas);
            }
        });
    }

    modifyRoom = (index) => {
        Swal.fire({
            title: 'Modificar sala',
            input: 'text',
            inputLabel: 'Inserte un nuevo nombre para la sala',
            inputValue: this.state.salas[index],
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'El nuevo nombre de la sala no debe estar en blanco';
                } else {
                    var auxiliar = this.state.salas;
                    var correcto = true;
                    auxiliar.forEach(element => {
                        if (value.toUpperCase() === element.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una sala con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                var auxiliar = this.state.salas;
                    auxiliar.fill(result.value, index, index+1);
                this.setState({
                    salas : auxiliar
                })
            }
        });
    }

    render() {
      return (
            <div>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    <Menu />
                </div>
                <div className='content_box'>
                    {
                        this.state.salas.map((sala, index) => {
                            return (
                                <div className='box_sala' key={index} onClick={() => this.modifyRoom(index)}>
                                    <p className='box_sala_target noselect'>
                                        {sala}
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