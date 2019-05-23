import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {
  
  state = {
    username: "",
    password: "",
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const photoUrl = this.state.photoUrl;

    this.props.signup({ username, password, firstName, lastName, email, photoUrl })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, firstName, lastName, email, photoUrl } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>
          <br/>
          <label>First name:</label>
          <input type="text" name="firstName" value={firstName} onChange={this.handleChange}/>
          <br/>
          <label>Last name:</label>
          <input type="text" name="lastName" value={lastName} onChange={this.handleChange}/>
          <br/>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={this.handleChange}/>
          <br/>
          <label>Photo:</label>
          <input type="file" name="photoUrl" value={photoUrl} onChange={this.handleChange}/>
          <br/>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <br/>
          <input type="submit" value="Signup" />
        </form>

        <p>Already have account? 
          <Link to={"/login"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default withAuth(Signup);