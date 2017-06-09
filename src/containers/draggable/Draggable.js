import React, { Component } from 'react';
import './Draggable.css';
import Fidget from '../../components/fidget/Fidget';

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDown: {
        x: undefined,
        y: undefined,
      },
      mouseUp: {
        x: undefined,
        y: undefined,
      },
      lastLocation: {
        x: undefined,
        y: undefined,
      },
      speed: 0,
      angle: 0,
    }
  }

  captureMouseDown = (e) => {
    // console.log(`Mouse Down -> x: ${e.clientX}, y: ${e.clientY}`);
    let mouseDown = { x: e.clientX, y: e.clientY };
    const angle = this.angle(e) - this.state.angle;
    this.setState({
      mouseDown,
      dragging: true,
      originalAngle: angle
    });
  }

  captureMouseUp = (e) => {
    // console.log(`Mouse Up -> x: ${e.clientX}, y: ${e.clientY}`);
    let mouseUp = { x: e.clientX, y: e.clientY }
    // let speed = this.calcSpeed();
    this.setState({
      mouseUp,
      dragging:false,
      originalAngle: undefined,
    });
  }

  angleBetween2Points = (a,b) => {
    // console.log(a);
    // console.log(b);
    let p1 = {
      x: a.x,
      y: a.y
    };

    let p2 = {
      x: b.x,
      y: b.y
    };

    let angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    // console.log(angleDeg);
    return angleDeg;
  }

  angle = (event) => {
    const center = {
        x: event.currentTarget.offsetLeft + (event.currentTarget.offsetWidth/2),
        y: event.currentTarget.offsetTop + (event.currentTarget.offsetHeight/2),
      };

    // }

    // Get the draggable div dimensions

    // Rotate the spinner at first drag (speed is 0 at that time)
    // If we are draggin but speed is 0
    return this.angleBetween2Points(center, {x:event.pageX, y:event.pageY});
  }

  calcSpeed = (event) => {
    // We dont want to increase speed if we are not dragging
    if(!this.state.dragging) return;


    // for (var whatever in event.currentTarget) {
    //   console.log(whatever);
    // }
    // debugger

    const angle = this.angle(event) - this.state.originalAngle;
    let speed = this.state.speed;

    if(this.state.lastLocation.x) {
      const difference = {
        x: event.pageX - this.state.lastLocation.x,
        y: event.pageY - this.state.lastLocation.y
      }
      speed += (difference.x^2 + difference.y^2);
    }

    this.setState({
      lastLocation: {
        x: event.pageX,
        y: event.pageY
      },
      speed,
      angle
    })
  }

  render() {
    return (
      <div
        id="draggable"
        className="draggable"
        onMouseDown={this.captureMouseDown}
        onMouseUp={this.captureMouseUp}
        onMouseMove={this.calcSpeed}
      >
        <div
          style={{
            backgroundColor: 'red',
            width: 1,
            height: 1,
            position: 'fixed',
            top: 146,
            left: 479,
            zIndex: 999999
          }}
         />
        <Fidget rotation={this.state.angle} speed={this.state.speed}></Fidget>
      </div>
    );
  }
}

export default Draggable;
