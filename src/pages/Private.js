import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
class Private extends Component {
  render() {
    const { user, photoUrl } = this.props
    return (
      <div>
        <h1>Welcome {user.firstName}</h1>
        <img src={photoUrl} alt="me"/>
      </div>
    )
  }
}

export default withAuth(Private);