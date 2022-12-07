import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class NotificacionesWebComponent extends Component {
  // const delay = (n) => new Promise( r => setTimeout(r, n*1000));
  /**
   * Prueba del delay
   */
  notificacionTimer = () => {
    var time = 900;
    while (time !== 0) {
      if (time <= 300 && time > 60) {
        if (time === 300) {
          toast.warning(
            "Quedan menos de: " + Math.round(time / 60) + " minutos",
            {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
        // this.delay(20);
      } else if (time <= 60) {
        if (time === 60) {
          toast.error(
            "Finalizando reunión en: " + Math.round(time / 60) + "  minuto",
            {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          // this.delay(20);
        }
      } else {
        if (time === 600) {
          toast.success("Quedan: " + Math.round(time / 60) + " minutos", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        // this.delay(20);
      }

      time -= 1;
      console.log(time);
    }
  };
  // delay = (n) => {
  //   return new Promise(function (resolve) {
  //     setTimeout(resolve, n * 1000);
  //   });
  // };
  componentDidMount = () => {
    toast.success("Comineza la reunión", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.notificacionTimer();
  };
  render() {
    return (
      <div>
        <ToastContainer />
      </div>
    );
  }
}
