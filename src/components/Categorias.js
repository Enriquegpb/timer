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
            categorias : ["Categoría 1", "Categoría 2"]
        });
    }


    state = {
        categorias : []
    }

    generateCategories = () => {
        Swal.fire({
            title: 'Nueva categoría',
            input: 'text',
            inputLabel: 'Inserte un nuevo nombre para la categoría',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'Debe añadir contenido para crear una nueva categoría';
                } else {
                    var auxiliar = this.state.categorias;
                    var correcto = true;
                    auxiliar.forEach(element => {
                        if (value.toUpperCase() === element.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una categoría con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                /*
                    #2 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para agregar la nueva categoría en la BBDD.
                */
                var auxiliar = this.state.categorias;
                    auxiliar.push(result.value);
                this.setState({
                    categorias : auxiliar
                })
                console.log(this.state.categorias);
            }
        });
    }

    modifyCategory = (index) => {
        Swal.fire({
            title: 'Modificar categoría',
            input: 'text',
            inputLabel: 'Inserte un nuevo nombre para la categoría',
            inputValue: this.state.categorias[index],
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value) {
                    return 'El nuevo nombre de la categoría no debe estar en blanco';
                } else {
                    var auxiliar = this.state.categorias;
                    var correcto = true;
                    auxiliar.forEach(element => {
                        if (value.toUpperCase() === element.toUpperCase()) {
                            correcto = false;       
                        }
                    });
                    if (!correcto) { return 'Ya existe una categoría con el mismo nombre' };
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                /*
                    #3 (GIO) TO (GUTI/SERGIO) ->
                    Resumen: Prepara esta zona para actualizar la categoría en la BBDD.
                */
                var auxiliar = this.state.categorias;
                    auxiliar.fill(result.value, index, index+1);
                this.setState({
                    categorias : auxiliar
                })
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
                                        {categoria}
                                    </p>
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