import { useState, useEffect } from 'react';

/*
    
    NO TRABAJAR EN ESTE COMPONENTE =====================================================================================

    ESTE COMPONENTE ENTERO NO SIRVE PARA ABSOLUTAMENTE NADA.
    SE ESTÁ UTILIZANDO EN EL ENTORNO DE DESARROLLO PARA 
    VISUALIZAR EL TIMER EN LA PANTALLA PRINCIPAL. SE SUSTITUIRÁ 
    POR EL TIMER REAL CONTROLADO POR EL SOCKET Y DESPUÉS SE ELIMINARÁ
    ESTE COMPONENTE.
    
*/

const Timer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = "December, 31, 2022";

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer" style={{"display":"contents"}}>
            {((hours <= 9)? "0" : "") + hours + ":" + ((minutes <= 9)? "0" : "") + minutes + ":" + ((seconds <= 9)? "0" : "") + seconds}
        </div>
    );
};
export default Timer;