import React, { Component } from 'react';
// import './draggable.css';

class Fidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
      <img src={require('../../skins/noun_1082409_cc.svg')} />
      </div>
    );
  }
}

export default Fidget;
