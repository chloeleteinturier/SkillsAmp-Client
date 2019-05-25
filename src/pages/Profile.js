import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

import userService from './../lib/users-service';


// import CurrentGrowthCompassCard from './../components/profile/CurrentGrowthCompassCard'
import TeamCard from './../components/profile/TeamCard'
// import TaskCard from './../components/profile/TaskCard'
// import EvolutionCard from './../components/profile/EvolutionCard'

class Profile extends Component {

  constructor(props){
    super(props);
    this.state={
      user: {},
    }
  }

  // displayTeam = ()=> {
  //   const { user } = this.state
  //   console.log('user',user)
  //   if(user.team){
  //     user.team.members.map( (oneMemberId) => {
  //     return userService.getOne(oneMemberId)
  //       .then((member)=>{
  //         return <p>{member.firstName}</p>
  //       })
  //     })
  //   }
  //   return <h2>{user.team.name}</h2>


  // }

  // componentDidMount() {
  //   //  fetch the data from API befor initial render
  //   const {user} = this.props
  //   userService.getOne(user._id)
  //     .then((user)=>{
  //       this.setState({ user: user.data })
  //     })  
  //   console.log(this.state.user)
  // }

  componentDidMount() {
    //  fetch the data from API befor initial render
    const {user} = this.props
    userService.getOne(user._id)
      .then((user)=>{
        this.setState({ user: user })
      })  
    console.log(this.state.user)
  }


  render() {
    const { user } = this.state
    console.log(this.props)
    console.log(user.team)
    console.log(this.state.user)
    console.log('this.props.team', this.props.user.team)
    return (
      <div>
        <h1>Welcome {user.firstName}</h1>
        <img src={user.photoUrl} alt="me"/>
        <br/>
        <Link to='/add-model'>Add new growth Model</Link>
        <br/>
        <Link to='/create-team'>Create a new team</Link>

        {
         user.team ?
         <TeamCard team={this.props.user.team}/>
         :
         null
        }


        
        {/* <CurrentGrowthCompassCard /> */}
        {/* <TeamCard /> */}
        {/* <TaskCard /> */}
        {/* <EvolutionCard /> */}
      </div>
    )
  }
}

export default withAuth(Profile);