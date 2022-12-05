import React, { Component } from 'react';

import Menu from './Menu';

export class Categorias extends Component {
    render() {
        return (
            <div>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    <Menu />
                </div>
                Categorias
            </div>
        )
    }
}

export default Categorias;