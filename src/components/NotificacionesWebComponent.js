import React, { Component } from 'react'
/**
 * Ejemplo de Vibracion en REACT pulsando un botón
 */
export default class NotificacionesWebComponent extends Component {
    handleAction = () => {
      navigator.vibrate(1000);
    }

    componentDidMount=()=>{
      this.handleAction();
    }
  
    render() {
      return (
        <button onClick={this.handleAction}>Perform Action</button>
      );
    }
  
}
