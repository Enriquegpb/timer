import React, { Component } from 'react';
import './css/SalaPopUp.css';

export class SalaPopUp extends Component {
    nindex = 0;
    state = {
        salas : [ "SALA 1", "SALA 2", "SALA 3", "SALA 4", "SALA 5", "SALA 6", "SALA 7", "SALA 8", "SALA 9", "SALA 10", "SALA 11"]
    }

    exit = () => { this.props.changeStatusSalaPopUp(); }
    changeRoom = (name) => { 
        this.props.changeRoomName(name);
        this.exit();
    }

    /*
        #1 (GIO) TO (SERGIO) ->
        Resumen: NECESITO UN MÉTODO QUE CARGUE (AL CONSTRUIR EL COMPONENTE) EN EL OBJETO 'salas'
        UN ARRAY CON LOS NOMBRES DE TODAS LAS SALAS A MOSTRAR.

        Explicación: Este componente controla un menú emergente en la pantalla principal. Su 
        función es que el usuario pueda cambiar su vista de sala actual a cualquier otra creada.
        El componente ya se encarga de crear estos controles (da igual si hay más controles que
        espacio en el menu, este controla el desbordamiento de salas y te permite realizar scroll).
    */

    render() {
        return (
            <div className='box-component'>
                <div className='box-popup'>
                    <span className='close-icon' onClick={ () => this.exit() }></span>
                    <span className='box-btns'>
                        {
                            this.state.salas.map((sala, index) => {
                                this.nindex = (this.nindex >= 5)? 1 : this.nindex + 1;
                                var scolor = "var(--s0" + this.nindex + ")";
                                return (
                                <button className='popup-btn-sala' 
                                        style={{"backgroundColor":scolor}}
                                        key={index}
                                        onClick={ () => this.changeRoom(sala)}>
                                    {sala}
                                </button>
                                );
                            })
                        }
                    </span>
                </div>
            </div>
        )
    }
}

export default SalaPopUp;