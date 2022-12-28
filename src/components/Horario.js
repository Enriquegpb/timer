import React, { Component } from 'react';
import './css/Horario.css';

export class Horario extends Component {
    state = {
        temporizadores : null,
        salas : null,
        sala_actual : null
    }

    componentDidMount = () => {
        this.loadRooms();
        this.loadTimers();
    }

    loadRooms = () => {
        /*
            #1 (GIO) TO (ALL)
            Resumen: Necesito preparar este método para cargar todas las
                     salas creadas hasta este momento y almacenarlas
                     en el array del state. (Después eliminar el ejemplo de abajo)
        */
        this.setState({
            salas : ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala 5"]     
        })
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
                    idtimer : 1,
                    inicio : "08:45",
                    idcategoria : 2, // SUPONGAMOS QUE ES 'BREAK 5MIN'
                    pausa : false // No necesario
                },
                {
                    idtimer : 1,
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

    render() {
        return (
            <div>
                <h1 className='timer_title'>HORARIO</h1>
                <div className='schedule_table_box'>
                    <table className='schedule_table'>
                        <thead>
                            <tr className='schedule_header'>
                                <th></th>
                                <th>currentRoom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.temporizadores && this.state.salas && (
                                    this.state.temporizadores.map((tempo, index) => {
                                        return (
                                            tempo.idcategoria === 1 ? ( // Únicamente a una sala/empresa
                                                <tr key={index}>
                                                    <td>{tempo.inicio}<br/>{this.getEnd(tempo.idtimer)}</td>
                                                    <td>{this.getCompany(tempo.idtimer)}</td>
                                                </tr>
                                            ) : ( // Asociado a todas las salas
                                                <tr key={index}>
                                                    <td>{tempo.inicio}<br/>{this.getEnd(tempo.idtimer)}</td>
                                                    <td>{this.getCategory()}</td>
                                                </tr>
                                            )
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