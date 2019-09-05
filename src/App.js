import React, { Component } from 'react';
import {Switch} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddModel from './pages/AddModel';
import CreateTeam from './pages/CreateTeam';
import MyTeam from './pages/MyTeam';
import Checkpoint from './pages/Checkpoint';
import Assessment from './pages/Assessment';
import FinalAssessment from './pages/FinalAssessment';
// import EditProfile from './pages/EditProfile';



import AuthProvider from './providers/AuthProvider';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className='root-wrap'>
          <Switch>
            <AnonRoute exact path='/' component={LandingPage} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path='/add-model' component={AddModel} />
            <PrivateRoute path='/create-team' component={CreateTeam} />
            <PrivateRoute exact path='/myteam/:id' component={MyTeam} />
            <PrivateRoute exact path='/myteam/:teamId/checkpoint/:checkpointId' component={Checkpoint} />
            <PrivateRoute path='/myteam/:teamId/checkpoint/:checkpointId/assessment/:assessmentId' component={Assessment} />
            <PrivateRoute path='/myteam/:teamId/checkpoint/:checkpointId/final-assessment/:finalAssessmentId' component={FinalAssessment} />
            {/* <PrivateRoute path='/edit-profile' component={EditProfile} /> */}
          </Switch>
          <Footer />
        </div>
      </AuthProvider>
    )
  }
}

export default App;
