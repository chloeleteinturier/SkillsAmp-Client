import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';


import formService from './../lib/form-service.js';




import largeLogo from "./../assets/logo_skillsamp_L.png"


class Signup extends Component {
  
  state = {
    password: "",
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const photoUrl = this.state.photoUrl;

    console.log(this.state)
      this.props.signup({password, firstName, lastName, email, photoUrl })
      .then(() => {})
      .catch( error => console.log(error) )
    }
  

  handleChange = (event) => {  
    event.preventDefault()
    console.log(this.state)
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  componentDidMount() {
    formService.loadFormAnimations()
  }

  render() {
    const { password, firstName, lastName, email, photoUrl } = this.state;
    return (

      
      <div className="cover-container text-center">
        <header className="landing-header p-4">
          <Link to='/'><img src={largeLogo} alt="Skillsamp" /></Link>
        </header>
        <main className="signin">
          <form className="needs-validation" onSubmit={this.handleFormSubmit} noValidate>
            <legend>Sign up with you email</legend>
            <p>or <Link to="/login" className="btn btn-secondary btn-sm ml-2 mr-2">Log in</Link>if you already have an account</p>
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
              <input type="file" className="custom-file-input" id="customFile" name='photoUrl' value={photoUrl} onChange={(event)=>this.handleChange(event)} required />
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
                Please, enter a passworod.
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
    )
  }
}

export default withAuth(Signup);