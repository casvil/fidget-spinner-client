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
        <img src={require('../../skins/noun_1082409_cc.svg')} alt="spinner" />
      </div>
    );
  }
}

export default Fidget;
