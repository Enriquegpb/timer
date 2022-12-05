import React, { Component } from 'react';

import Menu from './Menu';

export class Empresas extends Component {
    render() {
        return (
            <div>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    <Menu />
                </div>
                Empresas
            </div>
        )
    }
}

export default Empresas;