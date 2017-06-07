import React, { Component } from 'react';
import './App.css';
import Draggable from './components/draggable/Draggable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Draggable></Draggable>
      </div>
    );
  }
}

export default App;
