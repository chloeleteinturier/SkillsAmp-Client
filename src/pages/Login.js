import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';


import formService from './../lib/form-service';
import userService from './../lib/users-service';

import largeLogo from "./../assets/logo_skillsamp_L.png"

//Redux
import { connect } from 'react-redux';
import * as actions from './../redux/actions/actions'
import authService from '../lib/auth-service';


class Login extends Component {
  state = {
    email: "",
    password: "",
    message: ''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state

    authService.login({ email, password })
    .then((user) => {
      this.props.login({user, isLogged: true})
      })
      .catch(error => console.log(error))
  }

      // .then((data) => {
      //   if(data === undefined){
      //     console.log('data', data);
          
      //     userService.getOneByEmail(email)
      //       .then((user)=> {
      //         if (user.data.length ){
      //           this.setState({message:'password incorrect'})
      //         } else {
      //           this.setState({message:'email doesn\'t exist'})
      //         }
      //       })
      //   }
      // })
      // .catch( (error) => console.log(error))
  

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  componentDidMount() {
    formService.loadFormAnimations()
  }

  render() {
    const { email, password, message } = this.state;
    return (
      <div className="cover-container text-center">
        <header className="landing-header p-4">
          <Link to='/'><img src={largeLogo} alt="Skillsamp" /></Link>
        </header>
        <main className="signin">
          <form className="needs-validation" onSubmit={this.handleFormSubmit} noValidate>
            <legend>Log in to SkillsAmp</legend>
            <p>or <Link to='/signup' className="btn btn-secondary btn-sm ml-2 mr-2">Sign up free</Link>and get a new account</p>   
            {
              message.length ?
              <p style={{color: 'red'}}>{message}</p>
              :
              null
            }                    
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

// export default withAuth(Login);


const mapStateToProps = state => {
  return { state };
};


const mapDispatchToProps = dispatch => {
  return {
    login: (body) => dispatch(actions.login(body)),
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
