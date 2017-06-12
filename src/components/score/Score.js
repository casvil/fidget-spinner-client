import React, { Component } from 'react';
import './Score.css';

class Score extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const scores = this.props.scores.map((element) =>
      <li key={`${element.user}_${element.score}`}>
        {element.user}: {element.score}
      </li>
    );
    return (
      <ul>{scores}</ul>
    );
  }
}

export default Score;
