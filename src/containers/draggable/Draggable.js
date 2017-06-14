import React, { Component } from 'react';
import { TimelineMax, TweenLite, TweenMax } from "gsap";
import Fidget from '../../components/fidget/Fidget';
import './draggable.css';

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
      center: undefined,
      dragging: false,
      spinning: false,
    }
  }

  angleBetween2Points = (a,b) => {
    let p1 = {
      x: a.x,
      y: a.y
    };

    let p2 = {
      x: b.x,
      y: b.y
    };

    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  }

  angle = (event) => {
    const center = {
      x: event.currentTarget.offsetLeft + (event.currentTarget.offsetWidth/2),
      y: event.currentTarget.offsetTop + (event.currentTarget.offsetHeight/2),
    };

    // Rotate the spinner at first drag (speed is 0 at that time)
    // If we are draggin but speed is 0
    return this.angleBetween2Points(center, {x:event.pageX, y:event.pageY});
  }

  captureMouseDown = (e) => {
    // console.log(`Mouse Down -> x: ${e.clientX}, y: ${e.clientY}`);
    let mouseDown = { x: e.clientX, y: e.clientY };
    const angle = this.angle(e) - this.state.angle;

    // if (!this.state.spinning) {
      this.setState({
        mouseDown,
        dragging: true,
        originalAngle: angle,
        speed: 0
      });
    // } else {
    //   this.setState({
    //     mouseDown,
    //     dragging: false,
    //     originalAngle: angle
    //   });
    // }
  }

  captureMouseMove = (e) => {
    // We dont want to increase speed if we are not dragging
    if(!this.state.dragging) return;

    const angle = this.angle(e) - this.state.originalAngle;
    let speed = this.state.speed;

    if(this.state.lastLocation.x) {
      const difference = {
        x: e.pageX - this.state.lastLocation.x,
        y: e.pageY - this.state.lastLocation.y
      }
      speed += (-difference.x + difference.y)//*Math.abs(difference.x + difference.y)/2;
    }

    this.setState({
      lastLocation: {
        x: e.pageX,
        y: e.pageY
      },
      speed,
      angle
    });
  }

  captureMouseUp = (e) => {
    // console.log(`Mouse Up -> x: ${e.clientX}, y: ${e.clientY}`);
    let mouseUp = { x: e.clientX, y: e.clientY }
    const newAngle = this.state.angle + this.state.speed;

    // if (!this.state.spinning) this.rotate();
    this.setState({
      mouseUp,
      dragging:false,
      spinning: true, // only when speed is 0
      originalAngle: undefined,
      speed: 0,
      lastLocation: {
        x: undefined,
        y: undefined
      },
      angle: newAngle
    });

    this.rotate(newAngle);

  }

  rotate = (newAngle) => {
    let element = this.refs.spinner.followMouse;
    let animation = new TimelineMax({
      repeat: 0,
      onComplete: this.setSpinToFalse
    })
    .to(element,
        1,
        {rotation: `${newAngle}`},
        0);
  }

  setSpinToFalse = () => {
    console.log('haha looser LEL');
    this.setState({
      spinning: false
    });
  }

  render() {
    return (
      <div
        id="draggable"
        className="draggable"
        onMouseDown={this.captureMouseDown}
        onMouseUp={this.captureMouseUp}
        onMouseMove={this.captureMouseMove}
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
        <Fidget ref="spinner" rotation={this.state.angle}/>
      </div>
    );
  }
}

export default Draggable;
