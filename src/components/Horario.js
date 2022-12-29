import React, { Component } from 'react';
import './css/Horario.css';

export class Horario extends Component {
    state = {
        temporizadores : null,
        salas : null,
        sala_actual : -1
    }

    componentDidMount = () => {
        this.loadRooms();
        this.loadTimers();
    }

    changeRoom = (index) => {
        var auxiliar = this.state.sala_actual + index;
        
        if (auxiliar < 0) {
            auxiliar = 0;
        } 
        
        if (auxiliar >= this.state.salas.length) {
            auxiliar = this.state.salas.length - 1;
        }

        this.setState({
            sala_actual : auxiliar
        });
    }

    loadRooms = () => {
        /*
            #1 (GIO) TO (ALL)
            Resumen: Necesito preparar este método para cargar todas las
                     salas creadas hasta este momento y almacenarlas
                     en el array del state. (Después sustituir el array 
                     de ejemplo por el correcto)
        */
        this.setState({
            salas : [
                {
                    idsala : 1,
                    sala : "Sala 1"
                },
                {
                    idsala : 2,
                    sala : "Sala 2"
                },
                {
                    idsala : 3,
                    sala : "Sala 3"
                },
                {
                    idsala : 4,
                    sala : "Sala 4"
                }
            ]     
        }, () => {
            this.changeRoom(0);
        });
    }

    loadTimers = () => {
        /*
            #2 (GIO) TO (ALL)
            Resumen: Necesito preparar este método para cargar todos los
                     temporizadores creados hasta este momento y almacenarlos
                     en el array del state. (Después eliminar el ejemplo de abajo)
        */
        this.setState({
            temporizadores : [
                {
                    idtimer : 1,
                    inicio : "08:30",
                    idcategoria : 1, // SUPONGAMOS QUE ES 'WORK'
                    pausa : false // No necesario
                },
                {
                    idtimer : 2,
                    inicio : "08:45",
                    idcategoria : 2, // SUPONGAMOS QUE ES 'BREAK 5MIN'
                    pausa : false // No necesario
                },
                {
                    idtimer : 3,
                    inicio : "08:50",
                    idcategoria : 3, // SUPONGAMOS QUE ES 'LONG BREAK'
                    pausa : false // No necesario
                }
            ]
        });
    }

    /*
        #3 (GIO) TO (ALL)
        Resumen: ¿No se mantiene el orden al cargar los temporizadores verdad? 
                    Sería más cómodo tener el array ordenado por de más temprano
                    a más tarde, a través de su 'inicio'. Si es posible, crear otro método
                    que reordene dicho array.
    */

    getEnd = (idtimer) => {
        /*
            #4 (GIO) TO (ALL)
            Resumen: Necesito un método que calcule la hora de finalización
                        del timer. Se podría pasar el texto a objeto Time (milisegundos)
                        añadir la duración (también en milisegundos) y posteriormente
                        realizar el parse al formato hh:mm inicial.
        */
        return "09:45";
    }
    
    getCompany = (idtimer) => {
        /*
            #5 (GIO) TO (ALL)
            Resumen: Necesito un método que me devuelva el nombre de la empresa
                     asociada al timer pasado por parámetros.
        */
       return "Empresa de pega";
    }

    getCategory = (idtimer) => {
        /*
            #6 (GIO) TO (ALL)
            Resumen: Necesito un método que me devuelva el nombre de la categoría
                     asociada al timer pasado por parámetros.
        */
       return "Break";
    }

    checkCompany = (idtimer) => {
        /*
            #7 (GIO) TO (ALL)
            Resumen: Necesito un método que busque en la tabla 'tiempos_empresas_salas'
                     un registro cuyo idtimer sea igual al pasado por parámetros y cuyo
                     idsala sea igual al que hay en la variable this.state.sala_actual.
                     En caso de que dicho registro exista, se devolverá true de lo contrario
                     se devolverá false. (Después eliminar el código de abajo, que lo utilizo de prueba)
        */
        if (idtimer === 1) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div>
                <h1 className='timer_title'>HORARIO</h1>
                <div className='schedule_table_box'>
                    <table className='schedule_table'>
                        <thead>
                            <tr className='schedule_header'>
                                <th></th>
                                <th>
                                    {
                                        this.state.sala_actual >= 0 && this.state.salas && (
                                            this.state.salas[this.state.sala_actual].sala
                                        )
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { /* (GIO) SIGO TRABAJANDO EN ESTO.... */
                                this.state.temporizadores && this.state.salas && (
                                    this.state.temporizadores.map((tempo, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{tempo.inicio}<br/>{this.getEnd(tempo.idtimer)}</td>
                                                <td>
                                                    {
                                                        this.checkCompany(tempo.idtimer) ? (
                                                            this.getCompany(tempo.idtimer)
                                                        ) : (
                                                            this.getCategory(tempo.idtimer)
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Horario;