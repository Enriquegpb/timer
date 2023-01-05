import React, { Component } from "react";
import Sound from 'react-sound';
export default class NotificacionesWebComponent extends Component {
  state = {
    status: false,
  };

  acabarTimer=()=>{
    this.setState({ 
      status:true
    })
  }
  render() {
    if(this.state.status===true)
    return (
      <div>
        NotificacionesWebComponent
        {
          this.state.status && 
          <Sound
          url="../assets/timbre.mp3"
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={() => console.log('Finished playing')}
        />
    
        }

      </div>
    );
    else
    return(
      <div>
        <h1>Todavía tengo tiempo</h1>
        <button onClick={this.acabarTimer}>acabar timer</button>
      </div>
    )
  }
}
