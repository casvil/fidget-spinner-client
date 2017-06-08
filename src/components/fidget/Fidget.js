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
    if (this.textInput) this.textInput.style.transform = `rotate(${this.props.rotation}deg)`;
    return (
      <div>
        <div style={{display: 'flex', flex: '1', border: '1px solid black'}}>
          <img ref={(input) => { this.textInput = input; }} className="rotate" id={this.state.id} src={require('../../skins/black.svg')} />
        </div>
        Mouse speed: {this.props.speed}
      </div>
    );
  }
}

export default Fidget;
