import React, { Component } from 'react';
import './App.css';
import Draggable from './containers/draggable/Draggable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{textAlign: 'center', fontSize: '60px'}}>King of the spin!</h1>
        <Draggable />
      </div>
    );
  }
}

export default App;
