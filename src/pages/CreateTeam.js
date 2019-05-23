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
      listOfGrowthModel:[]
    };
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  addMember = (event) =>{
    userService.getOne()
    this.setState({members: [...this.state.member]})

  }

  componentDidMount() {
    //  fetch the data from API befor initial render
    userService.getAll()
      .then((data)=>{
        this.setState({ listOfUsers: data.data })
      })  
      growthModelService.getAll()
      .then((data)=>{
        this.setState({ listOfGrowthModel: data.data })
      })  
  }

  render() {
    const {name, members, growthModel, listOfUsers, listOfGrowthModel} = this.state

    return (
      <div>
        <p>Team: {name}</p>
        <p>Members: {members}</p>
        <p>Growth Model: {growthModel}</p>
        <form>
          <label>Team name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange}/>
          <br/>

        <form>

          <label>Members:</label>
          <input list='users' type="text" name='members'/>
          <datalist id="users">
          { 
            listOfUsers.map( (user) => {
            return (
              <option key={user._id} value={`${user.firstName} ${user.lastName}`} /> 
            )})
          }
          </datalist>
          <button onClick={this.addMember}>Add more member</button>
        </form>
          <br/>

          <label>Growth Model:</label>
          <input list='growthModels' type="text" name='growthModel' onChange={this.handleChange}/>
          <datalist id="growthModels">
          { 
            listOfGrowthModel.map( (growthModel) => { // ********* listOfUsers to change for listOfGrowthModel and update the folowing line too
            return (
              <option key={growthModel._id} value={growthModel.name} /> 
            )})
          }
          </datalist>
          
        </form>
      </div>
    )
  }
}
