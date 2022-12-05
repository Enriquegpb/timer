import React, { Component } from 'react';
import './css/TimerView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

/* TEMPORAL */
import Timer from './Timer';

/* SUBCOMPONENTES */
import Menu from './Menu';
import SalaPopUp from './SalaPopUp';

export class TimerView extends Component {
    state = {
        time : 0,               // Almacena el tiempo principal que se consume y se muestra
        room_name : "SALA",     // Almacena el nombre de la sala actual
        statusSalaPopUp : false // Almacena la aparición o no del PopUp de selección de sala
    }

    changeStatusSalaPopUp = () => {
        this.setState({
            statusSalaPopUp : !this.state.statusSalaPopUp
        });
    }

    changeRoomName = (name) => {
        this.setState({
            room_name : name
        });
    }

    render() {
        return (
            <div>
                {   // Subcomponente SalaPopUp (se incluirá cuando su status se modifique)
                    this.state.statusSalaPopUp && (
                        <SalaPopUp changeStatusSalaPopUp={this.changeStatusSalaPopUp} changeRoomName={this.changeRoomName} />
                    )
                }
                <header>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    {/* 
                        Nota: (Gio) De momento estoy obteniendo resultados que no me gustan cuando inserto el menu
                                    fuera de los componentes, en index.js. De momento se quedarán por separado en
                                    cada componente. Una vez esté la App completada pasaré a intentar optimizar 
                                    este tipo de resultados.
                    */}
                    <Menu />
                </div>
                    <button className='mainsala noselect' onClick={ () => this.changeStatusSalaPopUp() }>
                        {this.state.room_name}
                    </button>
                    <p className='maincompany noselect'>
                        {/* 
                            #2 (GIO) TO (SERGIO) ->
                            Resumen: Al igual que con el apartado 'Siguiente', es necesario incluir
                            un condicional en el que se modifique el contenido de este apartado
                            según el momento en el que nos encontremos. 
                            
                            Explicación: Es posible que tengamos textos del tipo:

                                            Está hablando:
                                         Nombre de la empresa
                                                  -
                                      Nos encontramos en descanso
                                         
                         */}
                        <b>Está hablando:</b><br/><i>Nombre de la empresa</i>
                    </p>
                </header>
                <div className='maincircle mainshadow shadowcircle'>
                    <span className='valuecircle noselect'>
                        {/* 
                            #1 (GIO) TO (GUTI/SERGIO) ->
                            Resumen: NECESITO UN DIV CON EL VALOR DE TIEMPO (mm:ss) 
                            Ejemplo: <div>15:27</div>
                        */}
                        <Timer />
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
                                
                        Métodos que pueden ayudar: El método 'changeRoomName' ya está a la escucha de
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