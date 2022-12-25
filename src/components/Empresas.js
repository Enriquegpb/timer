import React, { Component } from 'react';
import plusicon from '../assets/plus.svg';

import Swal from 'sweetalert2';
import './css/Empresas.css';

export class Empresas extends Component {

    componentDidMount = () => {
        /*
            #1 (GIO) TO (GUTI/SERGIO) ->
            Resumen: Prepara el componentDidMount para cargar los nombres de las
            categorías almacenadas en la BBDD.
        */
        this.setState({
            empresas : ["empresa 1", "empresa 2"]
        });
    }


    state = {
        empresas : []
    }

    generateCompany = () => {
        Swal.fire({
            title: 'Nueva empresa',
            input: 'text',
            inputLabel: 'Inserte un nuevo nombre para la empresa',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe añadir contenido para crear una nueva empresa';
                } else {
                    var auxiliar = this.state.empresas;
                    var correcto = true;
                    auxiliar.forEach(element => {
                        if (value.toUpperCase() === element.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una empresa con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                /*
                    #2 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para agregar la nueva empresa en la BBDD.
                */
                var auxiliar = this.state.empresas;
                    auxiliar.push(result.value);
                this.setState({
                    empresas : auxiliar
                })
                console.log(this.state.empresas);
            }
        });
    }

    modifyCompany = (index) => {
        Swal.fire({
            title: 'Modificar empresa',
            input: 'text',
            inputLabel: 'Inserte un nuevo nombre para la empresa',
            inputValue: this.state.empresas[index],
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'El nuevo nombre de la empresa no debe estar en blanco';
                } else {
                    var auxiliar = this.state.empresas;
                    var correcto = true;
                    auxiliar.forEach(element => {
                        if (value.toUpperCase() === element.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una empresa con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                /*
                    #3 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para actualizar la empresa en la BBDD.
                */
                var auxiliar = this.state.empresas;
                    auxiliar.fill(result.value, index, index+1);
                this.setState({
                    empresas : auxiliar
                })
            }
        });
    }

    render() {
        return (
            <div>
                <div className='content_box'>
                    {
                        this.state.empresas.map((empresa, index) => {
                            return (
                                <div className='box_empresa' key={index} onClick={() => this.modifyCompany(index)}>
                                    <p className='box_empresa_target noselect'>
                                        {empresa}
                                    </p>
                                </div>
                            )
                        })
                    }
                    <div className='box_empresa last_item' onClick={() => this.generateCompany()}>
                        <p className='box_empresa_target noselect'>
                            <img src={plusicon} alt="Icono más" className='plusicon'/>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Empresas;