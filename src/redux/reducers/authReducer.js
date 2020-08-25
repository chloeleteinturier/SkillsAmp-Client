import {LOGIN, ME} from './../types/types'
import authService from './../../lib/auth-service';

//   const initialeState = {
//     email: "qwerty@qwerty",
//     password: "123",
//   }

// function  authReducer (state = initialeState, action) {
//   switch(action.type){
//     case LOGIN:
//       return state = action.payload

//     default:
//       return state;
//   }
// }
let initialeState = {
  isLogged: false,
  user: {},
}



function  authReducer (state = initialeState, action) {
  console.log('state reducer', state);

  
  console.log('state check', state);


  switch(action.type){
    case ME:
      // const newState = {
      //   isLogged: true,
      //   user: {name: 'whatever', age: 23}
      // }
      return action.payload
      // authService.me()
      // .then((user) => {
      //   console.log('inside me', user);
        
      //   const newState = {
      //     isLogged: true,
      //     user: user
      //   }
      //   return newState
      // })
      // .catch((error) => {
      //   return { 
      //     isLogged: false,
      //     user: {},
      //   }
      // })

    case LOGIN:
      console.log('inside', action.payload); // {email: "chloe.leteinturier@gmail.com", password: "123"}
      
      authService.login(action.payload)
      .then((user) => {
        const newState = {
          isLogged: true,
          user: user
        }
        console.log('newState', newState);
        return {
          isLogged: true,
          user: user 
        }
      })
      .catch(error => console.log(error))
      break;
    default:
      return state;
  }
  console.log('finale state', state);
  
}

export default authReducer;