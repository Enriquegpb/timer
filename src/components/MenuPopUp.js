import React, { Component } from 'react';
import './css/MenuPopUp.css';

/* 
    En la medida de lo posible, trabajaremos con SVG para no cargar la App 
    con peso innecesario de imagenes para formas o iconos.
*/
import closeicon from '../assets/closeicon.svg';

export class MenuPopUp extends Component {

    exit = () => { this.props.showHiddenMenu(); } // Este método llama al showHiddenMenu del componente padre (menu)
    
    render() {
        return (
            <div className='menupopup-box-component' id='sidemenu'>
                <button className='menupopup-back' onClick={this.exit}>
                    <img src={closeicon} alt="Icono de cierre"/>
                </button>
                <div className='menupopup-box-items'> {/* Zona de redirección */}
                    <a href='/'>Timer</a>             {/* Pantalla principal */}
                    <a href='/horario'>Horario</a>    {/* CRUD del horario general del evento */}
                    <a href='/salas'>Salas</a>        {/* CRUD de las salas */}
                    <a href='/empresas'>Empresas</a>  {/* CRUD de las empresas */}
                    <a href='/categorias'>Categorías</a>        {/* CRUD de las categorías */}
                    <a href='/temporizadores'>Temporizadores</a>        {/* CRUD de los temporizadores */}
                    <a href='/login'>Login</a>        {/* Login para obenter permisos CUD del CRUD */}
                </div>
            </div>
        )
    }
}

export default MenuPopUp;