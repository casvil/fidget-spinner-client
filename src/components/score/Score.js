import React, { Component } from 'react';
import './Score.css';

class Score extends Component {

  render() {
    console.log(this.props.scores);
    const scores = this.props.scores.map((element) =>
      <li key={`${element._id}`}>
        <b>{element.name}</b>: {element.score}
      </li>
    );
    return (
      <div className="scores">
        <h1>Top Scores</h1>
        <ol>{scores}</ol>
      </div>
    );
  }
}

export default Score;
