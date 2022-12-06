import React, { Component } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class NotificacionesWebComponent extends Component {
    componentDidMount=()=>{
      toast('Faltan 15 segundos',{
        position:"top-right",
        autoClose:10000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress: undefined,
    });
    }
  render() {
    return (
      <div>
        <ToastContainer/>
      </div>
      
    )
  }
}
