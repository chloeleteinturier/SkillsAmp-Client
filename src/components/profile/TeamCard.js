import React, { Component } from 'react'
import { Link } from 'react-router-dom';


// import userService from './../../lib/users-service';
import teamsService from './../../lib/teams-service';


export default class TeamCard extends Component {
  constructor(props){
    super(props);
    this.state={
      team:{}
    }
  }

    componentDidMount() {
    //  fetch the data from API befor initial render
    const {team} = this.props
    console.log(team)
    teamsService.getOne(team)
      .then((oneTeam)=>{
        console.log(oneTeam.data)
        this.setState({team: oneTeam.data})
      })
  }


  // displayName = () =>{
  //   this.state.members.map( (oneMemberId) => {
  //     console.log('oneMemberId',oneMemberId)
  //     console.log('this.state.members',this.state.members)
  //     return userService.getOne(oneMemberId)
  //       .then((member)=>{
  //         const memberFirstNameCopy = this.state.memberFirstName
  //         memberFirstNameCopy.push(member.data.firstName)
  //         this.setState({ memberFirstName: memberFirstNameCopy})
  //         console.log(member.data.firstName)
  //         console.log(this.state.memberFirstName)
  //       })
  //   })
  // }

  displayName = () =>{
    console.log('this.state.team.members', this.state.team.members)
    console.log('this.props.team.members', this.props.team)
    // this.state.team.members.map((member)=>{
    //   console.log(member)
    // })
  }

  render() {
    console.log('this.state.team', this.state.team)
    const {team} = this.state
    this.displayName()
    return (
      <div>
        <Link to={`/myTeam/${this.props.team}`}>
          <h1>My Team: {team.name}</h1>
        </Link>
      {/* {
        this.displayName()
      } */}
      <p>hello</p>
      </div>
    )
  }
}
