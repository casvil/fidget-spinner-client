import React, { Component } from 'react';
import { TimelineMax } from "gsap";
import axios from 'axios';
import Fidget from '../../components/fidget/Fidget';
import Score from '../../components/score/Score';
import UserInfo from '../../components/user-info/UserInfo';
import './Draggable.css';

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
      animation: undefined,
      accumRotation: 0,
      scores: [],
      rotation: '120',
      name: '',
    }
  }

  captureMouseDown = (e) => {
    let mouseDown = { x: e.clientX, y: e.clientY };
    const angle = this.angle(e) - this.state.angle;
    console.log(angle);

    if (!this.state.spinning) {
      this.setState({
        mouseDown,
        dragging: true,
        originalAngle: angle,
        accumRotation: this.state.accumRotation + parseInt(this.state.rotation, 10)
      });
    } else {
      this.setState({
        mouseDown,
        dragging: false,
        originalAngle: angle,
        accumRotation: this.state.accumRotation + parseInt(this.state.rotation, 10)
      });
    }
  }

  captureMouseUp = (e) => {
    let mouseUp = { x: e.clientX, y: e.clientY }

    this.rotate();

    this.setState({
      mouseUp,
      dragging:false,
      spinning: true, // only when speed is 0
      originalAngle: undefined,
    });
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

  calcSpeed = (event) => {
    // We dont want to increase speed if we are not dragging
    if(!this.state.dragging) return;

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
    });
  }

  finishedSpin = () => {

    if (this.state.accumRotation) {
      console.log(this.state.name);
      axios({
        method: 'POST',
        url: 'http://localhost:3000/user',
        data: {
          name: this.state.name || 'Guest user',
          score: this.state.accumRotation
        }
      });

      this.setState({
        spinning: false,
        scores: [...this.state.scores, {name: this.state.name || 'Guest user', score: this.state.accumRotation, _id: this.state.scores.length+1}],
        accumRotation: 0
      });
    }
  }

  createAnimation = () => {
    return new TimelineMax({repeat: 0, onComplete: this.finishedSpin});
  }

  rotate = () => {
    let element = this.refs.spinner.followMouse;
    console.log(element);
    console.log(this.state.animation.totalProgress());
    this.state.animation.clear().to(element, 1, {rotation: `+=${this.state.rotation}`}, 0).play();
  }

  handleUsername = (name) => {
    console.log(name);
    this.setState({name})
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/user'
    }).then((scores) => {
      this.setState({
        scores: scores.data,
        animation: this.createAnimation()
      })
    });
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: "space-around"}}>
        <UserInfo onUserName={this.handleUsername} />
        <div
          id="draggable"
          className="draggable"
          onMouseDown={this.captureMouseDown}
          onMouseUp={this.captureMouseUp}
          onMouseMove={this.calcSpeed}
        >
          <Fidget ref="spinner" rotation={this.state.angle}/>
        </div>
        <Score scores={this.state.scores} />
      </div>
    );
  }
}

export default Draggable;
