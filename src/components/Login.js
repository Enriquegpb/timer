import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';

import Menu from './Menu';

export class Login extends Component {

    userbox = React.createRef();
    passwordbox = React.createRef();

    state = {
        token : null
    }

    setLogin = (e) => {
        e.preventDefault();
        localStorage.setItem("token", this.userbox.current.value + " " + this.passwordbox.current.value);
        this.updateToken();
    }

    updateToken = () => {
        this.setState({
            token : localStorage.getItem("token")
        });
    }
    
    componentDidMount = () => {
        this.updateToken();
    }

    signout = () => {
        localStorage.clear();
        this.setState({ token : null });
    }

    render() {
        return (
            <div>
                <div className='noselect' style={{"marginTop":"10px"}}>
                    <Menu />
                </div>
                {
                    this.state.token === null && (
                        <form onSubmit={this.setLogin}>
                            <label htmlFor="userbox" className='form-label noselect'>Usuario</label>
                            <input type="text" id='userbox' className='form-control' ref={this.userbox}/> 
                            <label htmlFor="passwordbox" className='form-label noselect mt-2'>Contraseña</label>
                            <input type="text" id='passwordbox' className='form-control' ref={this.passwordbox}/> 
                            <button className='buttonform'>
                                Iniciar sesión
                            </button>
                        </form>
                    )
                }
                {
                    this.state.token !== null && (
                        <button className='buttonform' onClick={this.signout}>
                            Cerrar sesión
                        </button>
                    )
                }
            </div>
        )
    }
}

export default Login;