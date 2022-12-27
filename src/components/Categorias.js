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
                    "name" : "CATEGORÍA 1",
                    "duration" : "00:15"
                },
                {
                    "name" : "Categoría 2",
                    "duration" : "00:30"
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
                        if (document.getElementById('swal-input1').value.toUpperCase() === element.name.toUpperCase()) {
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
                    name : result.value[0],
                    duration : result.value[1]
                }
                var auxiliar = this.state.categorias;
                    auxiliar.push(newCategory);
                this.setState({
                    categorias : auxiliar
                })
                console.log(this.state.categorias);
            }
        });
    }

    modifyCategory = (index) => {
        new Swal({
            title: 'Modificar categoría',
            html:
                '<label for="swal-input1">Nombre</label></br>' +
                '<input id="swal-input1" class="swal2-input" style="margin-top:5px;margin-bottom:0;" value="' + 
                this.state.categorias[index].name + 
                '"/></br>' +
                '<p id="error_1" style="display:none; color:red;">El nombre no puede estar vacío</p>' +
                '<label for="swal-input2">Duración</label></br>' +
                '<input type="time" id="swal-input2" class="swal2-input" value="' + 
                this.state.categorias[index].duration + 
                '" style="margin-top:5px;"/></br>' +
                '<p id="error_2" style="display:none; color:red; margin-bottom:0;">Tiempo mínimo: 1 minuto</p>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: '#2C4D9E',
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                if(!document.getElementById('swal-input1').value){
                    document.getElementById('error_1').style.display = 'inline-block';
                    document.getElementById('error_2').style.display = 'none';
                    return false;
                } else if(document.getElementById('swal-input2').value === "00:00") {
                    document.getElementById('error_1').style.display = 'none';
                    document.getElementById('error_2').style.display = 'inline-block';
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
                    #3 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para actualizar la categoría en la BBDD.
                */
                var newCategory = {
                    name : result.value[0],
                    duration : result.value[1]
                }
                var auxiliar = this.state.categorias;
                    auxiliar.fill(newCategory, index, index+1);
                this.setState({
                    categorias : auxiliar
                })
                console.log(this.state.categorias);
            }
        });
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
                                    <p className='box_categoria_target noselect'>
                                        {categoria.name}
                                    </p> <br/>
                                    {
                                        categoria.name.length > 12 && categoria.name.split().length > 1 ?
                                        (
                                            <p style={{"margin":"0"}}>{categoria.duration}</p>
                                        ) :
                                        (
                                            <p style={{"marginTop":"10px", "marginBottom":"0"}}>{categoria.duration}</p>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                    <div className='box_categoria last_item' onClick={() => this.generateCategories()}>
                        <p className='box_categoria_target noselect'>
                            <img src={plusicon} alt="Icono más" className='plusicon'/>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Categorias;