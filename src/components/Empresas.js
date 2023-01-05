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
            empresas : [
                {
                    idempresa : 1,
                    empresa : "Empresa 1",
                    imagen : ""
                },
                {
                    idempresa : 2,
                    empresa : "Empresa 2",
                    imagen : ""
                },
                {
                    idempresa : 3,
                    empresa : "Empresa 3",
                    imagen : ""
                },
            ]
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
                        if (value.toUpperCase() === element.empresa.toUpperCase()) {
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
                var newCompany = {
                    idempresa : this.state.empresas.length,
                    empresa : result.value,
                    imagen : ""
                }

                var auxiliar = this.state.empresas;
                    auxiliar.push(newCompany);
                this.setState({
                    empresas : auxiliar
                });
            }
        });
    }

    modifyCompany = (index) => {
        var currentName = this.state.empresas[index].empresa;
        Swal.fire({
            title: 'Modificar empresa',
            input: 'text',
            inputLabel: 'Nombre',
            inputValue: currentName,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar empresa",
            confirmButtonColor: "#2C4D9E",
            denyButtonText: "Eliminar empresa",
            denyButtonColor: "#FF0000",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'El nuevo nombre de la empresa no debe estar en blanco';
                } else {
                    var auxiliar = this.state.empresas;
                    var correcto = true;
                    if (currentName.toUpperCase() !== value.toUpperCase()) {
                        auxiliar.forEach(element => {
                            if (value.toUpperCase() === element.empresa.toUpperCase()) {
                                correcto = false;       
                            }
                        });                        
                    }
                    if (!correcto) { return 'Ya existe una empresa con el mismo nombre' };
                }
            }
        }).then((result) => {
            var auxiliar = this.state.empresas;
            if (result.isConfirmed) {
                /*
                    #3 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para actualizar la empresa en la BBDD.
                */
                var newCompany = {
                    idempresa : this.state.empresas[index].idempresa,
                    empresa : result.value,
                    imagen : ""
                }

                auxiliar.fill(newCompany, index, index+1);
                this.setState({
                    empresas : auxiliar
                });
            }
            if (result.isDenied) {
                auxiliar.splice(index, 1);
                this.setState({
                    empresas : auxiliar
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h1 className='timer_title'>EMPRESAS</h1>
                <div className='content_box'>
                    {
                        this.state.empresas.map((empresa, index) => {
                            return (
                                <div className='box_empresa' key={index} onClick={() => this.modifyCompany(index)}>
                                    <p className='box_empresa_target noselect'>
                                        {empresa.empresa}
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