import React, { Component } from 'react';
import {Switch, Link} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddModel from './pages/AddModel';
import CreateTeam from './pages/CreateTeam';


import AuthProvider from './providers/AuthProvider';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Link to='/'><h1>SkillsAmp</h1></Link>
            <Navbar />
            <AnonRoute exact path='/' component={LandingPage} />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path='/add-model' component={AddModel} />
            <PrivateRoute path='/create-team' component={CreateTeam} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
