import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import userService from './../lib/users-service';
import growthModelService from './../lib/growthModel-service';
import teamsService from './../lib/teams-service';


export default class CreateTeam extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      members: [],
      growthModel: '',
      growthModelName: '',
      listOfUsers:[],
      listOfGrowthModel:[],
      currentAddedMember: '',
      membersName: [],
      checkpoints: [],
    };
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
    // console.log('state', this.state)
  }

  handleChangeGrowthModel = (event) => {  
    const {value} = event.target;
    growthModelService.getOneByName(value)
      .then((OneGrowthModel)=>{
        this.setState({growthModel: OneGrowthModel._id});
      })
    this.setState({growthModelName: value});
  }

  updateState = (user) =>{
    const membersCopy = this.state.members;
    const membersNameCopy = this.state.membersName;
    const listOfUsersCopy = this.state.listOfUsers;
    // console.log('listOfUsersCopy', listOfUsersCopy)

    listOfUsersCopy.forEach((userObj, index) => {
      // console.log('userObj.id',userObj._id)
      // console.log('user.data[0]._id',user.data[0]._id)
      if(userObj._id === user.data[0]._id) {
        listOfUsersCopy.splice(index, 1);
      }
    })
    membersCopy.push(user.data[0]._id)
    membersNameCopy.push(`${user.data[0].firstName}`)
    console.log('user.data[0]',user.data[0])
    this.setState({
      members: membersCopy,
      membersName: membersNameCopy,
      currentAddedMember: '',
      listOfUsers: listOfUsersCopy,
    })
    // console.log('listOfUsers2',this.state.listOfUsers)
  }

  addMember = (event) =>{
    event.preventDefault()
    const {value} = event.target;
    const {members} = this.state
    // console.log(value)
    // console.log('listOfUsers1',this.state.listOfUsers)
    userService.getOneByEmail(value)
      .then((user)=>{

        console.log(members)
        let exists = false;
        if(members.length){
            members.forEach((memberId)=>{
              if(memberId === user.data[0]._id){
                return exists = true
              } 
            })
            if (!exists) {
              this.updateState(user)
            }
        } else {
          this.updateState(user)
        }
      })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {name, members, growthModel, checkpoints } = this.state;
    teamsService.createTeam({name, members, growthModel, checkpoints})
      .then((data)=>{
        console.log('new Team members:', data.members)
        console.log('new Team:', data)
        data.members.forEach((memberId)=>{
          const team = data._id
          console.log(memberId)
          userService.updateOne(memberId, team )
            .then((result)=>{
            console.log(result)
            })
        })
        this.props.history.push('/profile');
      })
  }

  componentDidMount() {
    //  fetch the data from API befor initial render
    userService.getAll()
      .then((users)=>{
        this.setState({ listOfUsers: users.data })
      })  
      growthModelService.getAll()
      .then((growthModels)=>{
        this.setState({ listOfGrowthModel: growthModels.data })
      })  
  }

  render() {
    const {name, membersName, growthModelName, listOfUsers, listOfGrowthModel, currentAddedMember} = this.state

    // console.log(listOfUsers)

    return (
      <div>
      <Link to='/'><h1>SkillsAmp</h1></Link>

        <p>Team: {name}</p>
        <p>Members:</p>
        {
          membersName.map((OneMemberName, index)=>{
            return (
              <p key={index}>{OneMemberName}</p>
            )
          })
        }

        <p>Growth Model: {growthModelName}</p>

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
          <input list='growthModels' type="text" name='growthModel' onChange={this.handleChangeGrowthModel}/>
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

        <Link to='/profile'>Back to Profile</Link>

      </div>
    )
  }
}
