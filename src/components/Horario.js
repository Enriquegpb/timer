import React, { Component } from 'react';

import Menu from './Menu';

export class Horario extends Component {
    render() {
        return (
            <div>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    <Menu />
                </div>
                Horario
            </div>
        )
    }
}

export default Horario;