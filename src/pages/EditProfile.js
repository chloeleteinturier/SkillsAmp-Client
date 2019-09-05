// import React, { Component } from 'react'
// import { withAuth } from '../providers/AuthProvider';

// import formService from './../lib/form-service.js';
// import userService from './../lib/users-service';

// import Navbar from './../components/Navbar'



// class EditProfile extends Component {

//   constructor(props){
//     super(props);
//     this.state={
//       user: {},
//       firstName: '',
//       lastName: '',
//       email: '',
//       photoUrl: '',
//       passwordToCheck: '',
//       newPassword: '',
//       message:''
//     }
//   }

//   componentDidMount() {
//     formService.loadFormAnimations()
//     //  fetch the data from API befor initial render
//     const {user} = this.props
//     userService.getOne(user._id)
//       .then((oneUser)=>{
//         this.setState( user)
//         this.setState( {user} )
//       })  
//   }

//   handleChange = (event) => {  
//     event.preventDefault()
//     console.log(this.state)
//     const {name, value} = event.target;
//     this.setState({[name]: value, message:''});
//   }

//   handleFormSubmit = (event) => {
//     event.preventDefault();
//     const {user, passwordToCheck, email} = this.state
//     const toCheck = {
//       email: user.email,
//       password: passwordToCheck
//     }
//     // this.props.checkPassword( toCheck )
//     //   .then((userChecked) => {
//     //     console.log('userChecked', userChecked)
//     //     if(!userChecked){
//     //       this.setState({message: 'this password is incorrect'})
//     //     }
//     //     else {
//     //       if(user.email !== email){
//     //         userService.getOneByEmail(email)
//     //         .then((user)=>{
//     //           if(user.data.length){
//     //             console.log(user.data)
//     //             this.setState({message: 'email already exists'})
//     //           } else {
//     //             this.updateUser()
//     //           }
//     //         })
//     //       } else {
//     //         this.updateUser()
//     //       }
//     //     }
//     //   })
//     //   .catch( error => console.log(error) )
//   }

//   updateUser = () =>{
//     const {user, email, newPassword, firstName, lastName, photoUrl } = this.state

//     console.log(user)

//     const userUpdated = user;
//     if(newPassword.length) {
//       userUpdated.password = newPassword;
//       console.log('pass changed')
//     }
//     userUpdated.email = email;
//     userUpdated.firstName = firstName;
//     userUpdated.lastName = lastName;
//     userUpdated.photoUrl = photoUrl;

//     console.log(userUpdated)
//     // userService.updateUser(user._id, userUpdated)
//     // .then((result)=>{
//     //   this.props.history.push(`/`);
//     // })
//   }

//   render() {
//     const {user, passwordToCheck, newPassword, firstName, lastName, email}= this.state

//     console.log('this.state', this.state)
//     console.log('user', this.state.user)

//     return (
//       <div>
//         <Navbar theUser={user} path={this.props.match.path}/>
        
//         <div className="cover-container text-center">
//           <main className="signin">
//             <form className="needs-validation" onSubmit={this.handleFormSubmit} noValidate>
//               {
//                 this.state.message.length ?
//                 <p style={{color: 'red'}}>{this.state.message}</p>
//                 :
//                 null
//               }
//               <div className="form-group">
//                 <span className="has-float-label">
//                   <input className="form-control" id="firstname" type="text" placeholder="Arya" name='firstName' value={firstName} onChange={(event)=>this.handleChange(event)} required />                           
//                   <label htmlFor="firstname">First name</label>
//                   <div className="valid-feedback">
//                     Looks good!
//                   </div>
//                   <div className="invalid-feedback">
//                     Please tell us your name.
//                   </div>                             
//                 </span>
//               </div>
//               <div className="form-group">
//                 <span className="has-float-label">
//                   <input className="form-control" id="lastname" type="text" placeholder="Stark" name='lastName' value={lastName} onChange={(event)=>this.handleChange(event)} required />
//                   <label htmlFor="lastname">Last name</label>
//                   <div className="valid-feedback">
//                     Looks good!
//                   </div>
//                   <div className="invalid-feedback">
//                     Please tell us your surname.
//                   </div>                                
//                 </span>
//               </div>                        
//               <div className="form-group">
//                 <span className="has-float-label">
//                   <input className="form-control" id="email" type="email" placeholder="aryastark@gmail.com" name='email' value={email} onChange={(event)=>this.handleChange(event)} required />
//                   <label htmlFor="email">Email</label>
//                   <div className="valid-feedback">
//                     Looks good!
//                   </div>
//                   <div className="invalid-feedback">
//                     We need a valid email.
//                   </div>                                
//                 </span>                            
//               </div>
//               <div className="form-group custom-file upload-photo">
//                 <input type="file" className="custom-file-input" id="customFile" name='photoUrl' onChange={(event)=>this.fileOnchange(event)} required />
//                 <label className="custom-file-label" htmlFor="customFile"> <i className="fas fa-cloud-upload-alt"/> Upload your photo</label>
//                 <div className="valid-feedback">
//                   Great pic!
//                 </div>
//                 <div className="invalid-feedback">
//                   Please, upload one profile photo.
//                 </div>                              
//               </div>
//               <div className="form-group has-float-label">
//                 <input className="form-control" id="password" type="password" placeholder=" " name='passwordToCheck' value={passwordToCheck} onChange={(event)=>this.handleChange(event)} required />
//                 <label htmlFor="password">Password</label>
//                 <div className="valid-feedback">
//                   Looks good!
//                 </div>
//                 <div className="invalid-feedback">
//                   Please, enter a password.
//                 </div>                              
//               </div>
//               <div className="form-group has-float-label">
//                 <input className="form-control" id="newPassword" type="password" placeholder=" " name='newPassword' value={newPassword} onChange={(event)=>this.handleChange(event)} />
//                 <label htmlFor="newPassword">New password</label>
//                 <div className="valid-feedback">
//                   Looks good!
//                 </div>
//                 <div className="invalid-feedback">
//                   Please, enter your new password.
//                 </div>                              
//               </div>
//               <button className="btn btn-block btn-primary btn-lg" type="submit">Save changes</button>
//             </form>
//           </main>
//       </div>

//       </div>
//     )
//   }
// }

// export default withAuth(EditProfile);
