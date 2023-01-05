import React, { Component } from 'react';
import './css/TimerView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import service from '../services/service';

/* SUBCOMPONENTES */
import SalaPopUp from './SalaPopUp';

export class TimerView extends Component {
    currentService = new service();

    state = {
        time : 0,                // Almacena el tiempo principal que se consume y se muestra
        sala_id : null,          // Almacena el id de la sala actual
        sala_nombre : null,      // Almacena el nombre de la sala actual
        timer_id : 1,            // Almacena el id del temporizador que aparece en pantalla
        empresa_id : null,
        empresa_nombre : null,
        statusSalaPopUp : false, // Almacena la aparición o no del PopUp de selección de sala
        checkCompany : false
    }

    componentDidMount = () => {
        this.currentService.getSalas().then((result) => {
            this.changeRoom(result[0].nombreSala, result[0].idSala);
        }); // Cargamos el nombre de la primera sala habilitada
    }

    changeStatusSalaPopUp = () => {
        this.setState({
            statusSalaPopUp : !this.state.statusSalaPopUp
        });
    }

    changeRoom = (name, id) => {
        this.setState({
            sala_id : id,
            sala_nombre : name
        });
        this.checkCompany();
    }

    checkCompany = () => { // Método para comprobar si hay empresa en el momento actual (tiempos_empresas_salas)
        var res = false;
        this.currentService.getTES().then((result) => {
            result.forEach(element => {
                if (element.idSala === this.state.sala_id && element.idTimer === this.state.timer_id) {
                    res = true;
                    this.setState({
                        empresa_id : element.idEmpresa
                    }, () => {this.getCompanyName()});
                }
            });
        }).then(() => {
            this.setState({
                checkCompany : res
            });
        });
    }

    getCompanyName = () => {
        this.currentService.getEmpresa(this.state.empresa_id).then((result) => {
            this.setState({
                empresa_nombre : result.nombreEmpresa
            });
        });
    }

    render() {
        return (
            <div>
                {   // Subcomponente SalaPopUp (se incluirá cuando su status se modifique)
                    this.state.statusSalaPopUp && (
                        <SalaPopUp changeStatusSalaPopUp={this.changeStatusSalaPopUp} changeRoom={this.changeRoom} />
                    )
                }
                <header>
                    <button className='mainsala noselect' onClick={ () => this.changeStatusSalaPopUp() }>
                        {this.state.sala_nombre}
                    </button>
                        {
                            this.state.checkCompany ? (
                                <p className='maincompany noselect'>
                                    <b>Está hablando:</b><br/><i>{this.state.empresa_nombre}</i>
                                </p>
                            ) : (
                                <p className='maincompany noselect'>
                                    <b>Descanso</b><br/><i>Ninguna empresa está hablando</i>
                                </p>
                            )
                        }
                </header>
                <div className='maincircle mainshadow shadowcircle'>
                    <span className='valuecircle noselect'>
                        {/* 
                            #1 (GIO) TO (GUTI/SERGIO) ->
                            Resumen: NECESITO UN DIV CON EL VALOR DE TIEMPO (mm:ss) 
                            Ejemplo: <div>15:27</div>
                        */}
                        15:27
                    </span>
                </div>
                <footer className='noselect'>
                    <b>Siguiente:</b>
                    {/* 
                        #1 (GIO) TO (SERGIO) ->
                        Resumen: NECESITO UN MÉTODO QUE ME DEVUELVA EL NOMBRE DE LA EMPRESA 
                        (Lo pondré dentro de los 'i' tag) Y UN MÉTODO QUE ME DEVUELVA EL NOMBRE 
                        DE LA CATEGORÍA DEL TEMPORIZADOR QUE VA A CONTINUACIÓN.

                        Explicación: En esta parte del componente se mostrarán los DOS siguientes 
                        'timers' de la SALA en la que nos situamos. Es decir, DEPENDIENDO de la
                        sala seleccionada en el menú de sala, esta información se va a actualizar.

                        Ideas planteadas:
                            #1 Se ha planteado la idea de que en este mismo componente se almacene un
                               array con los string de las empresas y categorías que van a ir en cada
                               'momento del evento'. Entendemos 'momento' como la posición que ocupan 
                               dichos string en el array. (O podrían ser 2 arrays, ns estudiarlo)
                               
                               Ejemplo de un posible array: 
                                            
                                            array[
                                                {"Nombre empresa A", "WORK"},
                                                {"Nombre empresa B", "WORK"},
                                            ]
                                
                                Entonces en el componente pondría:
                                    Siguiente:
                                            Nombre empresa A (WORK) -> Que sería el momento 1 (09:00 - 09:15)
                                            Nombre empresa B (WORK) -> Que sería el momento 2 (09:15 - 09:30)

                        Casos especiales: Existen categorías (BREAK, LARGE BREAK) en las que no existe
                        nombre de empresa. Quizás podríamos devolver un texto por defecto para esos casos,
                        como 'Descanso' o dejarlo en blanco o no sé si la API te deja guardar una descripción
                        de dicha categoría, etc. De nuevo estudiarlo, yo no he visto la API, lo que me conteis
                        que se pueda hacer, se hace.
                                
                        Métodos que pueden ayudar: El método 'changeRoom' ya está a la escucha de
                        cuando se produce dicho cambio de sala, pues es el que cambia el nombre de la
                        sala mostrada. El problema es que no solo se cambia este apartado 'Siguiente'
                        cuando cambias de sala sino cuando el timer agota su tiempo (habría que 
                        coordinarse con Guti)

                    */}
                    <p>
                        <i>Nombre de la empresa </i>(WORK)
                    </p>
                    <p>
                        <i>Nombre de la empresa </i>(WORK)
                    </p>
                </footer>
            </div>
        )
    }
}

export default TimerView;