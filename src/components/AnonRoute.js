import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import * as actions from './../redux/actions/actions'

//Redux
import { connect } from 'react-redux';
// import * as actions from './../redux/actions/actions'


const AnonRoute = ({ component: Component, user, isLogged, props, me, ...rest }) => {
  console.log('user', user);
  console.log('isLogged', isLogged);

  console.log('props', props);
  // console.log('isLogged', isLogged);

  me()

  console.log('data check', user, isLogged);
  
  console.log('rest', {...rest});
  
  return (
    
    <Route
      {...rest}
      render={props => {
        if (!isLogged) {
          console.log('is not logged', props);
          
          return <Component {...props} />
        } else {
          console.log('is logged', props);
          return <Redirect to={{ pathname: '/profile', state: { from: props.location } }} />
        }
      }
      }
    />
  )
}
// export default withAuth(AnonRoute);

const mapStateToProps = state => {
  console.log('statetoprops', {...state});
  
  // return { isLogged: state.isLogged, user: state.user };
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(actions.me()),
  };

};



export default connect(mapStateToProps, mapDispatchToProps)(AnonRoute);