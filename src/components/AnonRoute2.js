import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import * as actions from '../redux/actions/actions'

import authService from './../lib/auth-service';


//Redux
import { connect } from 'react-redux';
// import * as actions from './../redux/actions/actions'

class AnonRoute extends Component{


  // console.log('user', user);
  // console.log('isLogged', isLogged);


  // // console.log('isLogged', isLogged);



  // console.log('data check', user, isLogged);
  
  componentDidMount(){
    authService.me()
    .then((user) =>{
      this.props.me({user, isLogged: true})
    })
    .catch((error)=>{
      console.log('no user logged in');
    })
  }
  
  render (){

    console.log('props', this.props);
    console.log('state', this.state);

    let Component = this.props.component

    console.log('Component', Component);
    

    return(
      <Route

        render={() => {
          if (!this.props.isLogged) {
            console.log('is not logged', this.props);
            
            return <Component {...this.props} />
          } else {
            console.log('is logged', this.props);
            return <Redirect to={{ pathname: '/profile', state: { from: this.props.location } }} />
          }
        }
        }
      />
    )
  }
}
// export default withAuth(AnonRoute);

const mapStateToProps = state => {
  console.log('statetoprops', {...state});
  
  // return { isLogged: state.isLogged, user: state.user };
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    me: (user) => dispatch(actions.me(user)),
  };

};



export default connect(mapStateToProps, mapDispatchToProps)(AnonRoute);