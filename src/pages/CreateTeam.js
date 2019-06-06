import React, { Component } from 'react';

import { withAuth } from './../providers/AuthProvider';

import userService from './../lib/users-service';
import growthModelService from './../lib/growthModel-service';
import teamsService from './../lib/teams-service';
import formService from './../lib/form-service.js';


import Navbar from './../components/Navbar'


class CreateTeam extends Component {
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
      user: {}
    };
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
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

    listOfUsersCopy.forEach((userObj, index) => {
      if(userObj._id === user.data[0]._id) {
        listOfUsersCopy.splice(index, 1);
      }
    })
    membersCopy.push(user.data[0]._id)
    membersNameCopy.push(`${user.data[0].firstName}`)
    this.setState({
      members: membersCopy,
      membersName: membersNameCopy,
      currentAddedMember: '',
      listOfUsers: listOfUsersCopy,
    })
  }

  addMember = (event) =>{
    event.preventDefault()
    const {value} = event.target;
    const {members} = this.state
    userService.getOneByEmail(value)
      .then((user)=>{
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
        data.members.forEach((memberId)=>{
          const teamId = data._id
          userService.updateTheUserTeam(memberId, teamId )
            .then((result)=>{
            this.props.history.push('/profile');
            })
        });
      })
      .catch( error => console.log(error) )

  }

  componentDidMount() {
    const {user} = this.props
    userService.getOne(user._id)
      .then((oneUser)=>{
        this.setState({ user: oneUser })
      })
    //  fetch the data from API befor initial render
    userService.getAll()
      .then((users)=>{
        this.setState({ listOfUsers: users.data })
      })  
      growthModelService.getAll()
      .then((growthModels)=>{
        this.setState({ listOfGrowthModel: growthModels.data })
      })  
    formService.loadFormAnimations()

  }

  render() {
    const {name, membersName, growthModelName, listOfUsers, listOfGrowthModel, currentAddedMember, user} = this.state

    return (
      <div className='container-fluid content'>
        <div className='row'>

          <Navbar theUser={user} path={this.props.match.path}/>

          <div className="col- col-sm- col-md- col-lg-10 col-xl- mainview pt-3 pb-3">
            <h1 className="h4 text-center mb-5">Create a team</h1>
            <div className="container container-block pt-4 mb-4">
              <p className="h5 mb-3">Team name: <span className="font-weight-bold">{name}</span></p>
              <p className="h5 mb-3">Team members: 
                <span className="font-weight-bold">
                  {
                    membersName.map((OneMemberName, index)=>{
                      return (
                        <span key={index}> {OneMemberName},</span>
                      )
                    })
                  }
                </span>
              </p>
              <p className="h5 mb-3">Chosen growth model: <span className="font-weight-bold">{growthModelName}</span></p>
            </div>
          
            <div className="container container-block pt-4 pb-4">
              <form onSubmit={this.handleFormSubmit} className="needs-validation center-form" noValidate>
                <div className="form-group">
                  <span className="has-float-label">
                    <input className="form-control" id="team-name" name="name" type="text" placeholder=" " value={name} onChange={this.handleChange} required />
                    <label htmlFor="team-name">Team name</label>
                    <div className="valid-feedback">
                      Looks good!
                    </div>
                    <div className="invalid-feedback">
                      Please write a team name.
                    </div>                                
                  </span>                            
                </div>
                <div className="form-group">
                  <span className="has-float-label">
                    <input className="form-control" id="growthmodel" name="growthModel" type="text" list="growthModels" placeholder=" " onChange={this.handleChangeGrowthModel} required />
                    <label htmlFor="growthmodel">Growth Model</label>
                    <datalist id="growthModels">
                    { 
                      listOfGrowthModel.map( (growthModel) => {
                      return (
                        <option key={growthModel._id} value={growthModel.name} /> 
                      )})
                    }
                    </datalist>                                          
                    <div className="valid-feedback">
                      Looks good!
                    </div>
                    <div className="invalid-feedback">
                      Please choose one growth model.
                    </div>                                
                  </span>                            
                </div>
                <div className="cobntainer">
                  <div className="form-group row pr-3 pl-3">
                    <span className="has-float-label col-8 addmember-wrap">
                      <input className="form-control" id='addmember' name='currentAddedMember' value={currentAddedMember} onChange={this.handleChange} type='text' list='users' placeholder=' ' />
                      <label htmlFor='addmember'>Members</label>
                      <datalist id="users">
                      { 
                        listOfUsers.map( (user) => {
                        return (
                          <option key={user._id} value={`${user.email}`} /> 
                        )})
                      }
                      </datalist>                                    
                    </span>                            
                    <button name='members' value={currentAddedMember} onClick={this.addMember} className='col-4 btn btn-block btn-secondary btn-md w-auto'>Add a member</button>
                  </div>  
                </div>                                      
                <button className='btn btn-block btn-primary btn-lg' type='submit'>Create the team!</button>
              </form>                            
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(CreateTeam)