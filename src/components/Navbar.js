import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { withAuth } from './../providers/AuthProvider';


import mediumLogo from './../assets/logo_skillsamp_M.png'

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render() {
    const {theUser, logout} = this.props

    let createTeamStyle = classNames({
      'nav-item': true,
      active: this.props.path === '/create-team'
    })

    let profileStyle = classNames({
      'nav-item': true,
      active: this.props.path === '/profile'
    })

    let myTeamStyle = classNames({
      'nav-item': true,
      active: this.props.path === '/myteam/:id'
    })

    let editStyle = classNames({
      'nav-item': true,
      active: this.props.path === '/edit-profile'
    })


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
              <li className={profileStyle}>
                <Link to='/' className="nav-link">My skills wheel</Link>
              </li>
              {
              theUser.team ?
              <li className={myTeamStyle}>
                <Link to={`/myteam/${theUser.team._id}`} className="nav-link" >My team</Link>
              </li>
              :
              null
              }
              <li className={createTeamStyle}>
                <Link to='/create-team' className="nav-link">Create team</Link>
              </li>     
              <li className={editStyle}>
                <Link to='/edit-profile' className="nav-link">Edit profile</Link>
              </li>  
              <li className="nav-item">
                <div className="user-info text-center mb-5">
                  <div className="profile-pic m-auto">
                    <img src={theUser.photoUrl} alt={theUser.firstName} />
                  </div>
                  <p className="h4 mt-3">{theUser.firstName} {theUser.lastName}</p>
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