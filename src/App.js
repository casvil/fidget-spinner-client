import React, { Component } from 'react';
import './App.css';
import Draggable from './containers/draggable/Draggable';
import Fidget from './components/fidget/Fidget';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="left">
          <div className="user-info">User Info Component</div>
        </div>
        <div className="main">
          <h1>King of the spin!</h1>
          <Fidget></Fidget>
          <button>Single</button>
          <button>Multiplayer</button>
        </div>
        <div className="right">
          <div className="top-scores">Top Scores Component</div>
        </div>
      </div>
    );
  }
}

export default App;
