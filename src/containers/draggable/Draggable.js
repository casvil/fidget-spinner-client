import React, { Component } from 'react';
import './Draggable.css';
import Fidget from '../../components/fidget/Fidget';

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDown: {
        x: 0,
        y: 0,
      },
      mouseUp: {
        x: 0,
        y: 0,
      }
    }
  }

  captureMouseDown = (e) => {
    // console.log(`Mouse Down -> x: ${e.clientX}, y: ${e.clientY}`);
    let mouseDown = { x: e.clientX, y: e.clientY }
    this.setState({mouseDown});
  }

  captureMouseUp = (e) => {
    // console.log(`Mouse Up -> x: ${e.clientX}, y: ${e.clientY}`);
    let mouseUp = { x: e.clientX, y: e.clientY }
    this.setState({mouseUp});
  }

  render() {
    return (
      <div
        id="draggable"
        className="draggable"
        onMouseDown={this.captureMouseDown}
        onMouseUp={this.captureMouseUp}
      >
      <Fidget></Fidget>
      </div>
    );
  }
}

export default Draggable;
