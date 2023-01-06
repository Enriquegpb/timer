import React, { Component } from 'react';
import plusicon from '../assets/plus.svg';

import Swal from 'sweetalert2';
import service from '../services/service';
import './css/Empresas.css';

export class Empresas extends Component {
    currentService = new service();

    state = {
        empresas : [],
        token : false
    }

    componentDidMount = () => {
        this.loadCompanies();
        this.setState({
            token : (localStorage.getItem("token") !== null)
        });
    }

    loadCompanies = () => {
        this.currentService.getEmpresas().then((result) => {
            this.setState({
                empresas : result
            });
        })
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
                        if (value.toUpperCase() === element.nombreEmpresa.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una empresa con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.currentService.postEmpresa(result.value).then((result_2) => {
                    Swal.fire(
                        'Empresa creada',
                        'Se ha creado la nueva empresa en la Base de datos\n(code: x' + result_2.status + ")",
                        'success'
                    );
                    this.loadCompanies();
                });
            }
        });
    }

    modifyCompany = (index) => {
        if (this.state.token) {
            var currentName = this.state.empresas[index].nombreEmpresa;
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
                                if (value.toUpperCase() === element.nombreEmpresa.toUpperCase()) {
                                    correcto = false;       
                                }
                            });                        
                        }
                        if (!correcto) { return 'Ya existe una empresa con el mismo nombre' };
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) { // Modificar empresa
                    if (currentName.toUpperCase() !== result.value.toUpperCase()) {
                        this.currentService.putEmpresa(this.state.empresas[index].idEmpresa, result.value).then((result_3) => {
                            Swal.fire(
                                'Empresa modificada',
                                'Se ha modificado la empresa en la Base de datos\n(code: x' + result_3.status + ")",
                                'success'
                            );
                            this.loadCompanies();
                        });
                    }
                }
                if (result.isDenied) { // Eliminar empresa
                    this.currentService.deleteEmpresa(this.state.empresas[index].idEmpresa).then((result_4) => {
                        Swal.fire(
                            'Empresa eliminada',
                            'Se ha eliminado la empresa de la Base de datos\n(code: x' + result_4.status + ")",
                            'success'
                        );
                        this.loadCompanies();
                    });
                }
            });   
        }
    }

    render() {
        return (
            <div>
                <h1 className='timer_title noselect'>EMPRESAS</h1>
                <div className='content_box'>
                    {
                        this.state.empresas && (
                            this.state.empresas.map((empresa, index) => {
                                return (
                                    <div className='box_empresa' key={index} onClick={() => this.modifyCompany(index)}>
                                        <p className='box_empresa_target noselect'>
                                            {empresa.nombreEmpresa}
                                        </p>
                                    </div>
                                )
                            })
                        )
                    }
                    {
                        this.state.token && (
                            <div className='box_empresa last_item' onClick={() => this.generateCompany()}>
                                <p className='box_empresa_target noselect'>
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

export default Empresas;