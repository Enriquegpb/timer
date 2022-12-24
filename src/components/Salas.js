import React, { Component } from 'react';
import './css/Salas.css';

import Menu from './Menu';
import plusicon from '../assets/plus.svg';

export class Salas extends Component {

    state = {
        salas : ["TechnoSala", "Azure MetaSala Que agí vaaaaaaaaaa leñeeee vamossss daleeeeee fiuuuuu joeeeeee", "Office 365 Sala", "La Ultra Mega Sala tech riders vulcanoname"]
    }

    render() {
      return (
            <div>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    <Menu />
                </div>
                <div className='content_box'>
                    {
                        this.state.salas.map((sala, index) => {
                            return (
                                <div className='box_sala' key={index}>
                                    <p className='box_sala_target noselect'>
                                        {sala}
                                    </p>
                                </div>
                            )
                        })
                    }
                    <div className='box_sala last_item'>
                        <p className='box_sala_target noselect'>
                            <img src={plusicon} alt="Icono más" className='plusicon'/>
                        </p>
                    </div>
                </div>
            </div>
      )
    }
}

export default Salas;