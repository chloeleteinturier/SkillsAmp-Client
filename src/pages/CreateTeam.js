import React, { Component } from 'react'

import userService from './../lib/users-service';
import growthModelService from './../lib/growthModel-service';


export default class CreateTeam extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      members: [],
      growthModel: '',
      listOfUsers:[],
      listOfGrowthModel:[],
      currentAddedMember: '',
      membersName: [],
    };
  }

  handleChange = (event) => {  
    console.log(event.target)
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  // displayNames = () =>{
  //   this.state.members.map( (userId) => {
  //     console.log(userId)
  //     userService.getOne(userId)
  //       .then((user)=>{
  //         console.log(user)
  //         console.log('user.data.firstName', user.data.firstName)
  //         return(
  //           <p>{user.data.firstName}</p>
  //         )
  //       })
  //   })
  // }

  // fetchName = () =>{
  //   this.state.members.map((userId)=>{
  //     userService.getOne(userId)
  //       .then((user)=>{
  //         const membersNameCopy = this.state.membersName;
  //         membersNameCopy.push(user.data[0]._id)
  //         this.setState({
  //           members: membersCopy,
  //           currentAddedMember: ''
  //         })
  //       })
  //   })
  // }

  addMember = (event) =>{
    event.preventDefault()
    const {value} = event.target;
    console.log(value)
    userService.getOneByEmail(value)
      .then((user)=>{
        const membersCopy = this.state.members;
        const membersNameCopy = this.state.membersName;
        membersCopy.push(user.data[0]._id)
        membersNameCopy.push(`${user.data[0].firstName}`)
        this.setState({
          members: membersCopy,
          membersName: membersNameCopy,
          currentAddedMember: ''
        })
        console.log(this.state.members)
        console.log(this.state.membersName)
      })
  }

  // displayNames2 = () =>{
  //   const memberPromises = this.state.members.map( (userId => {
  //     console.log(userId)
  //     return userService.getOne(userId)
  //       .then((user)=>{
  //         console.log(user)
  //         console.log('user.data.firstName', user.data.firstName)
  //         return(
  //           <div key={user.data._id}>
  //             <p>{user.data.firstName}</p>
  //           </div>
  //         )
  //       })
      
  //   }))


  // Promise.all(memberPromises)
  //   .then((membersArray) => {
  //     this.setState({ members: membersArray})
  //   })
  // }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.addTheMovie(this.state);
    // Reset the state
    this.setState({ title: '', director: '', hasOscars: false, IMDbRating: '' });  	
  };

  componentDidMount() {
    //  fetch the data from API befor initial render
    userService.getAll()
      .then((users)=>{
        console.log(users)
        this.setState({ listOfUsers: users.data })
      })  
      growthModelService.getAll()
      .then((growthModels)=>{
        this.setState({ listOfGrowthModel: growthModels.data })
      })  
  }

  render() {
    const {name, members, membersName, growthModel, listOfUsers, listOfGrowthModel, currentAddedMember} = this.state

    return (
      <div>
        <p>Team: {name}</p>
        <p>Members:</p>
        {
          membersName.map((OneMemberName)=>{
            return (
              <p>{OneMemberName}</p>
            )
          })
        }

        <p>Growth Model: {growthModel}</p>

        <form onSubmit={this.handleFormSubmit}>
          <label>Team name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange}/>
          <br/>

          <label>Members:</label>
          <input list='users' type="text" name='currentAddedMember' value={currentAddedMember} onChange={this.handleChange}/>
          <datalist id="users">
          { 
            listOfUsers.map( (user) => {
            return (
              <option key={user._id} value={`${user.email}`} /> 
            )})
          }
          </datalist>
          <button name='members' value={currentAddedMember} onClick={this.addMember}>Add a member</button>
          <br/>

          <label>Growth Model:</label>
          <input list='growthModels' type="text" name='growthModel' onChange={this.handleChange}/>
          <datalist id="growthModels">
          { 
            listOfGrowthModel.map( (growthModel) => {
            return (
              <option key={growthModel._id} value={growthModel.name} /> 
            )})
          }
          </datalist>
          <br/>

          <button type="submit"> Create the team! </button>

        </form>
      </div>
    )
  }
}
