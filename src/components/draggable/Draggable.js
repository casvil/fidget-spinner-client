import React, { Component } from 'react';
import './draggable.css';
import handleMouseEvents from './handleMouseEvents';

class Draggable extends Component {
  captureMouseDown(e) {
    console.log(`Mouse Down -> x: ${e.clientX}, y: ${e.clientY}`);
  }
  captureMouseUp(e) {
    console.log(`Mouse Up -> x: ${e.clientX}, y: ${e.clientY}`);
  }
  render() {
    return (
      <div
        id="draggable"
        className="draggable"
        onMouseDown={this.captureMouseDown}
        onMouseUp={this.captureMouseUp}>
      </div>
    );
  }
}

export default Draggable;
