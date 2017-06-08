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
    return (
      <div>
        <img id={this.state.id} src={require('../../skins/black.svg')} alt="spinner" />
      </div>
    );
  }
}

export default Fidget;
