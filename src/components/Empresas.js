import React, { Component } from 'react';
import plusicon from '../assets/plus.svg';

import Swal from 'sweetalert2';
import './css/Empresas.css';
import axios from 'axios';
import Global from '../Global';
export class Empresas extends Component {
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
    postCompanies = (newCompany) => {
        var request = "/api/Empresas/CreateEmpresa/nombre";
        var url = Global.url + request;
        var company = 
            {
              idEmpresa: newCompany.idempresa,
              nombreEmpresa: newCompany.empresa,
              imagen: newCompany.imagen
            }
            console.log(company);
        axios.post(url,company).then(response => {
            console.log("Empresa agregada"); 
        });
    }
    updateCompanies = (newCompany) => {
        var request = "/api/Empresas/UpdateEmpresa/"+newCompany.idempresa+"/"+newCompany.empresa;
        var url = Global.url + request;
        var company={
            
                idCategoria: newCompany.idempresa,
                categoria: newCompany.nombre,
                imagen: newCompany.imagen
              
        }
        axios.put(url,company).then(response => {
            console.log("Empresa actualizada"); 
        });
    }
    componentDidMount = () => {
       this.loadCompanies();
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
                        // if (value.toUpperCase() === element.empresa.toUpperCase()) {
                        //     correcto = false;       
                        // }
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
                console.log(newCompany);
                this.postCompanies(newCompany);//Agrega el nombre de la nnueva empresa
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
                    // if (currentName.toUpperCase() !== value.toUpperCase()) {
                    //     auxiliar.forEach(element => {
                    //         if (value.toUpperCase() === element.empresa.toUpperCase()) {
                    //             correcto = false;       
                    //         }
                    //     });                        
                    // }
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
                })
                console.log(newCompany);
                this.updateCompanies(newCompany);
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