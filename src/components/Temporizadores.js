import React, { Component } from 'react';

import Menu from './Menu';

export class Temporizadores extends Component {
    render() {
        return (
            <div>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    <Menu />
                </div>
                Temporizadores
            </div>
        )
    }
}

export default Temporizadores;