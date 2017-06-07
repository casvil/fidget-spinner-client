import React, { Component } from 'react';
import './Fidget.css';

class Fidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img id="main" src={require('../../skins/black.svg')} alt="spinner" />
      </div>
    );
  }
}

export default Fidget;
