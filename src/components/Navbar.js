import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { withAuth } from './../providers/AuthProvider';


import mediumLogo from './../assets/logo_skillsamp_M.png'
import placeholder from './../assets/profile_placeholder.png'

class Navbar extends Component {
  render() {
    const {user, theUser, logout} = this.props
    console.log(this.props)
    return (
      <div className="col- col-sm- col-md- col-lg-2 col-xl- navview p-0">

        <nav className="navbar navbar-light navbar-expand-lg align-items-start flex-lg-column flex-row p-0">
          <div className="centered d-flex flex-column text-center">
            <Link to='/' className="navbar-brand m-0 pt-2 pb-0 pl-2 pr-2"><img src={mediumLogo} alt="Skillsamp" /></Link>
          </div>
          <Link to='#/' className="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
            <span className="navbar-toggler-icon" />
          </Link>
          <div className="collapse navbar-collapse sidebar w-100">
            <ul id='main-nav' className="flex-column navbar-nav w-100 justify-content-between pt-2">
              <li className="nav-item active">
                <Link to='/' className="nav-link">My skills wheel</Link>
              </li>
              {
              theUser.team ?
              <li className="nav-item">
                <Link to={`/myteam/${user.team}`} className="nav-link" >My team</Link>
              </li>
              :
              null
              }
              <li className="nav-item">
                <Link to='/create-team' className="nav-link">Create team</Link>
              </li>     
              <li className="nav-item">
                <div className="user-info text-center mb-5">
                  <div className="profile-pic m-auto">
                    <img src={placeholder} alt="Sigrid" />
                  </div>
                  <p className="h4 mt-3">{user.firstName} {user.lastName}</p>
                  <Link to='/' onClick={logout}>Log out</Link>
                </div>
              </li>                                                                                         
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default withAuth(Navbar)