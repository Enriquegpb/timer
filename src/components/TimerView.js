import React, { Component } from 'react';
import './css/TimerView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import service from '../services/service';

/* SUBCOMPONENTES */
import SalaPopUp from './SalaPopUp';
import Tiempo from './Tiempo';

export class TimerView extends Component {
    currentService = new service();

    state = {
        time : 0,                // Almacena el tiempo principal que se consume y se muestra
        sala_id : null,          // Almacena el id de la sala actual
        sala_nombre : null,      // Almacena el nombre de la sala actual
        timer_id : 1,            // Almacena el id del temporizador que aparece en pantalla
        empresa_id : null,
        empresa_nombre : null,
        next_timers : [],
        next_c1 : "",
        next_e1 : "",
        next_c2 : "",
        next_e2 : "",
        statusSalaPopUp : false, // Almacena la aparición o no del PopUp de selección de sala
        checkCompany : false
    }

    componentDidMount = () => {
        this.currentService.getSalas().then((result) => {
            this.changeRoom(result[0].nombreSala, result[0].idSala);
        }); // Cargamos el nombre de la primera sala habilitada
        this.getNextTimers();
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
        }, () => {
            this.checkCompany();
            this.getNextTimers();
        });
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

    getNextTimers = () => {
        var correct_position = -1;
        var nextTimers = [];
        this.currentService.getTemporizadores().then((result) => {
            result.sort(function (a, b) {
                return a.inicio.substring(a.inicio.length - 8).localeCompare(b.inicio.substring(a.inicio.length - 8));
            }); // Se han ordenado los timers por hora más temprana -> hora más tarde
            result.forEach((element, index) => {
                if (new Date(element.inicio).getTime() > new Date().getTime() && correct_position === -1) {
                    correct_position = index;
                }
            });
            nextTimers.push(result[correct_position]);
            nextTimers.push(result[correct_position+1]);
        }).then(() => {
            this.setState({
                next_timers : nextTimers
            }, () => {
                this.getCategoryName(this.state.next_timers[0].idCategoria, true);
                this.getCategoryName(this.state.next_timers[1].idCategoria, false);
                this.getLineName(this.state.next_timers[0].idTemporizador, true);
                this.getLineName(this.state.next_timers[1].idTemporizador, false);
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

    getLineName = (identificador, lineaUno) => {
        this.currentService.getTES().then((result) => {
            result.forEach(element => {
                if (element.idSala === this.state.sala_id && element.idTimer === identificador) {
                    this.currentService.getEmpresa(element.idEmpresa).then((result_2) => {
                        if (lineaUno) {
                            this.setState({ next_e1 : result_2.nombreEmpresa });
                        } else {
                            this.setState({ next_e2 : result_2.nombreEmpresa });
                        }
                    });
                }
            });
        });
    }

    getCategoryName = (identificador, lineaUno) => {
        this.currentService.getCategoria(identificador).then((result) => {
            if (lineaUno) {
                this.setState({ next_c1 : result.categoria });
            } else {
                this.setState({ next_c2 : result.categoria });
            }
        });
    }

    render() {
        return (
            <div>
                {
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
                        <Tiempo/>
                    </span>
                </div>
                {
                    this.state.next_timers.length > 0 && (
                        <footer className='noselect'>
                            <b>Siguiente:</b>
                            <p>
                                <i>{this.state.next_e1}</i> ({this.state.next_c1}) 
                                 - {this.state.next_timers[0].inicio.substring(this.state.next_timers[0].inicio.length - 8)}
                            </p>
                            <p>
                                <i>{this.state.next_e2}</i> ({this.state.next_c2})
                                 - {this.state.next_timers[1].inicio.substring(this.state.next_timers[1].inicio.length - 8)}
                            </p>
                        </footer>
                    )
                }
            </div>
        )
    }
}

export default TimerView;