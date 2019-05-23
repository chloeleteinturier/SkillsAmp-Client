import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { firstName } = user;
    if (isLogged) {
      return <div style={{ backgroundColor: 'grey'}}>
        <p>First name: { firstName }</p>
        <p onClick={logout}>Logout</p>
      </div>
    } else {
      return <div style={{ backgroundColor: 'grey'}}>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    }
  
  }
}

export default withAuth(Navbar);