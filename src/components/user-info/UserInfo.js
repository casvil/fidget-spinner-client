import React, { Component } from 'react';
import './UserInfo.css';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('hello?',event.target.value);
    if (event.target.value === '') {
      this.setState({user: 'new user'});
    } else {
      this.setState({user: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submitted: true
    })
  }

  render() {
    if (this.state.submitted === false) {
      return (
        <div className='user-info'>
        <h1>User Info</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.user} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return (
        <div className='user-info'>
          <h1>User Info</h1>
          Hello, {this.state.user}!
        </div>
      )
    }
  }
}

export default UserInfo;
