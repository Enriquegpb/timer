import React, { Component } from 'react';
import plusicon from '../assets/plus.svg';

import Swal from 'sweetalert2';
import './css/Categorias.css';

export class Categorias extends Component {

    componentDidMount = () => {
        /*
            #1 (GIO) TO (GUTI/SERGIO) ->
            Resumen: Prepara el componentDidMount para cargar los nombres de las
            categorías almacenadas en la BBDD.
        */
        this.setState({
            categorias : [
                {
                    idcategoria : 1,
                    categoria : "CATEGORÍA 1",
                    duracion : "00:15"
                },
                {
                    idcategoria : 2,
                    categoria : "Categoría 2",
                    duracion : "00:30"
                }
            ]
        });
    }


    state = {
        categorias : []
    }


    generateCategories = () => {
        new Swal({
            title: 'Nueva categoría',
            html:
                '<label for="swal-input1">Nombre</label></br>' +
                '<input id="swal-input1" class="swal2-input" style="margin-top:5px;margin-bottom:0;"/></br>' +
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
                /*
                    #2 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para agregar la nueva categoría en la BBDD.
                */
                var newCategory = {
                    idcategoria : this.state.categorias.length,
                    categoria : result.value[0],
                    duracion : result.value[1]
                }
                var auxiliar = this.state.categorias;
                    auxiliar.push(newCategory);
                this.setState({
                    categorias : auxiliar
                })
            }
        });
    }

    modifyCategory = (index) => {
        var currentName = this.state.categorias[index].categoria;
        new Swal({
            title: 'Modificar categoría',
            html:
                '<label for="swal-input1">Nombre</label></br>' +
                '<input id="swal-input1" class="swal2-input" style="margin-top:5px;margin-bottom:0;" value="' + 
                currentName + 
                '"/></br>' +
                '<p id="error_1" style="display:none; color:red;">El nombre no puede estar vacío</p>' +
                '<p id="error_2" style="display:none; color:red;">Ya existe una categoría con el mismo nombre</p>' +
                '</br><label for="swal-input2">Duración</label></br>' +
                '<input type="time" id="swal-input2" class="swal2-input" value="' + 
                this.state.categorias[index].duracion + 
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
            var auxiliar = this.state.categorias;
            if (result.isConfirmed) {
                /*
                    #3 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para actualizar la categoría en la BBDD.
                */
                var newCategory = {
                    categoria : result.value[0],
                    duracion : result.value[1]
                }
                    auxiliar.fill(newCategory, index, index+1);
                this.setState({
                    categorias : auxiliar
                })
            }
            if (result.isDenied) {
                auxiliar.splice(index, 1);
                this.setState({
                    categorias : auxiliar
                });
            }
        });
    }
    
    getDuration = (duracion) => {
        var mytime = duracion.split(":");
        if (mytime[0] !== "00") {
            return duracion + " h";
        } else {
            return mytime[1] + " min";
        }
    }

    render() {
        return (
            <div>
                <h1 className='timer_title'>CATEGORÍAS</h1>
                <div className='content_box'>
                    {
                        this.state.categorias.map((categoria, index) => {
                            return (
                                <div className='box_categoria' key={index} onClick={() => this.modifyCategory(index)}>
                                    <div className='box_categoria_target_time'>{this.getDuration(categoria.duracion)}</div>
                                    <div className='box_categoria_target noselect'>
                                        {categoria.categoria}
                                    </div>
                                </div>
                            )
                        })
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