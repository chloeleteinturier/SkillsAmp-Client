import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';

import userService from './../lib/users-service';

import Navbar from './../components/Navbar'



class EditProfile extends Component {

  constructor(props){
    super(props);
    this.state={
      user: {},
      password: '',
      newPassword: '',
      message:''
    }
  }

  componentDidMount() {
    //  fetch the data from API befor initial render
    const {user} = this.props
    userService.getOne(user._id)
      .then((oneUser)=>{
        this.setState({ user: oneUser })
      })  
  }

  render() {
    const {user, password, newPassword}= this.state
    const { firstName, lastName, email } = user;

    console.log(user)
    return (
      <div>
          <Navbar theUser={user} path={this.props.match.path}/>
        <div className="cover-container text-center">
          <main className="signin">
            <form className="needs-validation" onSubmit={this.handleFormSubmit} noValidate>
              {
                this.state.message.length ?
                <p style={{color: 'red'}}>{this.state.message}</p>
                :
                null
              }
              <div className="form-group">
                <span className="has-float-label">
                  <input className="form-control" id="firstname" type="text" placeholder="Arya" name='firstName' value={firstName} onChange={(event)=>this.handleChange(event)} required />                           
                  <label htmlFor="firstname">First name</label>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    Please tell us your name.
                  </div>                             
                </span>
              </div>
              <div className="form-group">
                <span className="has-float-label">
                  <input className="form-control" id="lastname" type="text" placeholder="Stark" name='lastName' value={lastName} onChange={(event)=>this.handleChange(event)} required />
                  <label htmlFor="lastname">Last name</label>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    Please tell us your surname.
                  </div>                                
                </span>
              </div>                        
              <div className="form-group">
                <span className="has-float-label">
                  <input className="form-control" id="email" type="email" placeholder="aryastark@gmail.com" name='email' value={email} onChange={(event)=>this.handleChange(event)} required />
                  <label htmlFor="email">Email</label>
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    We need a valid email.
                  </div>                                
                </span>                            
              </div>
              <div className="form-group custom-file upload-photo">
                <input type="file" className="custom-file-input" id="customFile" name='photoUrl' onChange={(event)=>this.fileOnchange(event)} required />
                <label className="custom-file-label" htmlFor="customFile"> <i className="fas fa-cloud-upload-alt"/> Upload your photo</label>
                <div className="valid-feedback">
                  Great pic!
                </div>
                <div className="invalid-feedback">
                  Please, upload one profile photo.
                </div>                              
              </div>
              <div className="form-group has-float-label">
                <input className="form-control" id="password" type="password" placeholder=" " name='password' value={password} onChange={(event)=>this.handleChange(event)} required />
                <label htmlFor="password">Password</label>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div className="invalid-feedback">
                  Please, enter a password.
                </div>                              
              </div>
              <div className="form-group has-float-label">
                <input className="form-control" id="newPassword" type="password" placeholder=" " name='newPassword' value={newPassword} onChange={(event)=>this.handleChange(event)} required />
                <label htmlFor="newPassword">New password</label>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div className="invalid-feedback">
                  Please, enter your new password.
                </div>                              
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="terms" required />
                <label className="form-check-label small" htmlFor="terms">I agree to SkillsAmp’s <a href="#/">Terms of Service</a></label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
              <button className="btn btn-block btn-primary btn-lg" type="submit">Create new account</button>
            </form>
          </main>
      </div>

      </div>
    )
  }
}

export default withAuth(EditProfile);
