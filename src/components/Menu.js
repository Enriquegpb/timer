import React, { Component } from 'react';
import './css/Menu.css';

/* 
    En la medida de lo posible, trabajaremos con SVG para no cargar la App 
    con peso innecesario de imagenes para formas o iconos.
*/
import menuicon from '../assets/menuicon.svg';

/* SUBCOMPONENTES */
import MenuPopUp from './MenuPopUp';

/* TEMPORAL */
import Timer2 from './Timer_2';

export class Menu extends Component {

    showHiddenMenu = () => {
        document.getElementById("sidemenu").classList.toggle("menupopup-box-component-show");
        document.getElementById("divbg_black").classList.toggle("background_black_show");
    }

    render() {
        return (
            <div style={{"width":"100%"}}>
                <div className='background_black' id='divbg_black'></div> {/* Div para oscurecer y bloquear el fondo */}
                <MenuPopUp showHiddenMenu={this.showHiddenMenu} divbg_black={this.divbg_black}/> {/* Menu lateral emergente */}
                <div className='menubar'> {/* NavBar general */}
                    <button className='menucircle' onClick={this.showHiddenMenu}>
                        <img src={menuicon} alt="Icono de tres líneas para el menú"/>
                    </button>
                    {/* 
                        #1 (GIO) TO (GUTI/SERGIO) ->
                        Resumen: NECESITO UN DIV CON EL VALOR DE TIEMPO HASTA EL FIN DEL EVENTO (hh:mm:ss) 
                        Ejemplo: <div>07:15:27</div>
                        A tener en cuentra: Si aún no se ha configurado el horario (por ende no hay hora 
                        fin del evento) deberíamos deshabilitar esa información.
                    */}
                    <b className='menutag'>Tiempo restante... <span><Timer2 /></span></b>
                </div>
            </div>
        )
    }
}

export default Menu;