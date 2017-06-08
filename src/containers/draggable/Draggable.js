import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
    this.setState({
      mouseDown,
      dragging: true
    });
  }

  captureMouseUp = (e) => {
    // console.log(`Mouse Up -> x: ${e.clientX}, y: ${e.clientY}`);
    let mouseUp = { x: e.clientX, y: e.clientY }
    // let speed = this.calcSpeed();
    this.setState({
      mouseUp,
      dragging:false
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

  calcSpeed = (event) => {
    // We dont want to increase speed if we are not dragging
    if(!this.state.dragging) return;

    // Rotate the spinner at first drag (speed is 0 at that time)
    // If we are draggin but speed is 0
    let angle = this.angleBetween2Points({x:475, y:125}, {x:event.pageX, y:event.pageY});
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
        <Fidget rotation={this.state.angle} speed={this.state.speed}></Fidget>
      </div>
    );
  }
}

export default Draggable;
