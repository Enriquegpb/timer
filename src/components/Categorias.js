import React, { Component } from 'react';
import plusicon from '../assets/plus.svg';

import Swal from 'sweetalert2';
import service from '../services/service';
import './css/Categorias.css';

export class Categorias extends Component {
    currentService = new service();

    state = {
        categorias : null
    }

    componentDidMount = () => {
        this.loadcategories();
    }

    loadcategories = () => {
        this.currentService.getCategorias().then((result) => {
            this.setState({
                categorias : result
            });
        });
    }

    generateCategories = () => {
        new Swal({
            title: 'Nueva categoría',
            html:
                '<label for="swal-input1">Nombre</label></br>' +
                '<input id="swal-input1" class="swal2-input" style="margin-top:5px;margin-bottom:0;max-width:70%;"/></br>' +
                '<p id="error_1" style="display:none; color:red;">El nombre no puede estar vacío</p>' +
                '<p id="error_2" style="display:none; color:red;">Ya existe una categoría con el mismo nombre</p></br>' +
                '<label for="swal-input2">Duración</label></br>' +
                '<input type="time" id="swal-input2" class="swal2-input" value="00:15" style="margin-top:5px;"/></br>' +
                '<p id="error_3" style="display:none; color:red; margin-bottom:0;">Tiempo mínimo: 1 minuto</p>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: '#2C4D9E',
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                if(document.getElementById('swal-input1').value) {
                    var auxiliar = this.state.categorias;
                    var correcto = true;
                    auxiliar.forEach(element => {
                        if (document.getElementById('swal-input1').value.toUpperCase() === element.categoria.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { 
                        document.getElementById('error_1').style.display = 'none';
                        document.getElementById('error_2').style.display = 'inline-block';
                        document.getElementById('error_3').style.display = 'none';
                        return false; 
                    };
                }

                if(!document.getElementById('swal-input1').value){
                    document.getElementById('error_1').style.display = 'inline-block';
                    document.getElementById('error_2').style.display = 'none';
                    document.getElementById('error_3').style.display = 'none';
                    return false;
                } else if(document.getElementById('swal-input2').value === "00:00") {
                    document.getElementById('error_1').style.display = 'none';
                    document.getElementById('error_2').style.display = 'none';
                    document.getElementById('error_3').style.display = 'inline-block';
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
                var newDuration = this.transformDuration(result.value[1]);
                var newCategory = {
                    idCategoria : 0,
                    categoria : result.value[0],
                    duracion : newDuration
                }
                this.currentService.postCategoria(newCategory).then((result) => {
                    Swal.fire(
                        'Categoría creada',
                        'Se ha creado la nueva categoría en la Base de datos\n(code: x' + result.status + ")",
                        'success'
                    );
                    this.loadcategories();
                });
            }
        });
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

    transformMinutes = (duracion, legend) => {
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

    modifyCategory = (index) => {
        var currentName = this.state.categorias[index].categoria;
        var currentDuration = this.state.categorias[index].duracion;
        new Swal({
            title: 'Modificar categoría',
            html:
                '<label for="swal-input1">Nombre</label></br>' +
                '<input id="swal-input1" class="swal2-input" style="margin-top:5px;margin-bottom:0;max-width:70%;" value="' + 
                currentName + 
                '"/></br>' +
                '<p id="error_1" style="display:none; color:red;">El nombre no puede estar vacío</p>' +
                '<p id="error_2" style="display:none; color:red;">Ya existe una categoría con el mismo nombre</p>' +
                '</br><label for="swal-input2">Duración</label></br>' +
                '<input type="time" id="swal-input2" class="swal2-input" value="' + 
                this.transformMinutes(this.state.categorias[index].duracion, false) + 
                '" style="margin-top:5px;"/></br>' +
                '<p id="error_3" style="display:none; color:red; margin-bottom:0;">Tiempo mínimo: 1 minuto</p>',
            focusConfirm: false,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar categoría",
            confirmButtonColor: "#2C4D9E",
            denyButtonText: "Eliminar categoría",
            denyButtonColor: "#FF0000",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                if(!document.getElementById('swal-input1').value){
                    document.getElementById('error_1').style.display = 'inline-block';
                    document.getElementById('error_2').style.display = 'none';
                    document.getElementById('error_3').style.display = 'none';
                    return false;
                } else if(document.getElementById('swal-input2').value === "00:00") {
                    document.getElementById('error_1').style.display = 'none';
                    document.getElementById('error_2').style.display = 'none';
                    document.getElementById('error_3').style.display = 'inline-block';
                    return false;
                } else {
                    var correcto = true;
                    var newName = document.getElementById('swal-input1').value.toUpperCase();
                    if (newName !== currentName.toUpperCase()) {
                        this.state.categorias.forEach(element => {
                            if (element.categoria.toUpperCase() === newName) {
                                correcto = false;
                            }
                        });
                    }
                    if (correcto) {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value
                        ]                        
                    } else {
                        document.getElementById('error_1').style.display = 'none';
                        document.getElementById('error_2').style.display = 'inline-block';
                        document.getElementById('error_3').style.display = 'none';
                        return false;
                    }
                }
            }
        }).then((result) => {
            if (result.isConfirmed) { // Modificar categoría
                if (result.value[0].toUpperCase() !== currentName.toUpperCase() || this.transformDuration(result.value[1]) !== currentDuration) {
                    var newCategory = {
                        idCategoria : this.state.categorias[index].idCategoria,
                        categoria : result.value[0],
                        duracion : this.transformDuration(result.value[1])
                    }
                    this.currentService.putCategoria(newCategory).then((result) => {
                        Swal.fire(
                            'Categoría modificada',
                            'Se ha modificado la categoría en la Base de datos\n(code: x' + result.status + ")",
                            'success'
                        );
                        this.loadcategories();
                    });
                }
            }
            if (result.isDenied) { // Eliminar categoría
                this.currentService.deleteCategoria(this.state.categorias[index].idCategoria).then((result_2) => {
                    Swal.fire(
                        'Categoría eliminada',
                        'Se ha eliminado la categoría en la Base de datos\n(code: x' + result_2.status + ")",
                        'success'
                    );
                    this.loadcategories();
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h1 className='timer_title'>CATEGORÍAS</h1>
                <div className='content_box'>
                    {
                        this.state.categorias && (
                            this.state.categorias.map((categoria, index) => {
                                return (
                                    <div className='box_categoria' key={index} onClick={() => this.modifyCategory(index)}>
                                        <div className='box_categoria_target_time'>{this.transformMinutes(categoria.duracion, true)}</div>
                                        <div className='box_categoria_target noselect'>
                                            {categoria.categoria}
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                    <div className='box_categoria last_item' onClick={() => this.generateCategories()}>
                        <p className='box_categoria_target_plus noselect'>
                            <img src={plusicon} alt="Icono más" className='plusicon'/>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Categorias;