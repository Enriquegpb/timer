import React, { Component } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class NotificacionesWebComponent extends Component {
  notificacionTimer=()=>{
    var time=900;
    while(time!==0){
      if(time<300 && time>60){
        if(time===175){
        toast.warning('Quedan menos de: '+time+ ' segundos',{
          position:"top-right",
          autoClose:1000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress: undefined,
          
      });
    }
      }else if(time<=60){
        if(time===60){
        toast.error('Finalizando reunión en: '+time+' segundos',{
          position:"top-right",
          autoClose:1000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress: undefined,
          
      });
    }
      }else{
        if (time===600){
        toast.success('Quedan: '+time+' segundos',{
          position:"top-right",
          autoClose:1000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress: undefined,
          
      });
    }
      }

      time-=1;
      console.log(time);
    }
    
  } 
    componentDidMount=()=>{
      toast.success('Comineza la reunión',{
        position:"top-right",
        autoClose:1000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress: undefined,
        
    });
    this.notificacionTimer();
   
  }
  render() {
    return (
      <div>
        <ToastContainer/>
      </div>
      
    )
  }
}
