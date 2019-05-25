import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';


import formService from './../lib/form-Service.js';

import largeLogo from "./../assets/logo_skillsamp_L.png"


class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state

    this.props.login({ email, password })
      .then(() => {})
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  componentDidMount() {
    formService.loadFormAnimations()
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="cover-container text-center">
        <header className="landing-header p-4">
          <Link to='/'><img src={largeLogo} alt="Skillsamp" /></Link>
        </header>
        <main className="signin">
          <form className="needs-validation" onSubmit={this.handleFormSubmit} noValidate>
            <legend>Log in to SkillsAmp</legend>
            <p>or <Link to='/signup' className="btn btn-secondary btn-sm ml-2 mr-2">Sign up free</Link>and get a new account</p>                       
            <div className="form-group">
              <span className="has-float-label">
                <input className="form-control" id="email" type="email" placeholder="aryastark@gmail.com" name="email" value={email} onChange={this.handleChange} required />
                <label htmlFor="email">Email</label>
                <div className="valid-feedback">
                  Looks good!
                </div>
                <div className="invalid-feedback">
                  Please enter your email.
                </div>                                
              </span>                            
            </div>
            <div className="form-group has-float-label">
              <input className="form-control" id="password" type="password" placeholder=" " name="password" value={password} onChange={this.handleChange} required />
              <label htmlFor="password">Password</label>
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Please, enter your passworod.
              </div>                              
            </div>
            <button className="btn btn-block btn-primary btn-lg" type="submit">Log in</button>
          </form>
        </main>
      </div>
    )
  }
}

export default withAuth(Login);
