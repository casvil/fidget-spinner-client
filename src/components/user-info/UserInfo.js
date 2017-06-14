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
    this.setState({user: event.target.value});
  }

  handleSubmit(event) {
    this.props.onUserName(this.state.user);

    event.preventDefault();
    if (this.state.user === '') {
      this.setState({user: 'Guest user'});
    }
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
              <input id="user-input" type="text" value={this.state.user} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      );
    } else {
      return (
        <div className='user-info'>
          <h1>Hello, {this.state.user}!</h1>
        </div>
      )
    }
  }
}

export default UserInfo;
