import React, { Component } from 'react';
import './Fidget.css';

class Fidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 'main', // ['main', 'my-fidget']
    };
  }

  render() {
    if (this.followMouse) this.followMouse.style.transform = `rotate(${this.props.rotation}deg)`;
    return (
      <div style={{display: 'flex', flex: '1', border: '1px solid black'}}>
        <img ref={(image) => { this.followMouse = image; }} className="rotate" id={this.state.id} src={require('../../skins/black.svg')} alt="fidget" />
      </div>
    );
  }
}

export default Fidget;
