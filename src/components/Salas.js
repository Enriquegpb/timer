import React, { Component } from 'react';

import Menu from './Menu';

export class Salas extends Component {
    render() {
      return (
            <div>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    <Menu />
                </div>
                Salas
            </div>
      )
    }
}

export default Salas