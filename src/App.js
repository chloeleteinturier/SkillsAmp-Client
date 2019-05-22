import React, { Component } from 'react';
import {Switch, Link} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './providers/AuthProvider';
import LandingPage from './components/LandingPage';


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
            <PrivateRoute exact path="/profile" component={Private} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
