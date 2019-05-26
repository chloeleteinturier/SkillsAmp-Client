import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';

import teamsService from './../lib/teams-service';
import checkpointService from './../lib/checkpoint-service';
import userService from './../lib/users-service';

import CheckpointInfoCard from './../components/checkpoint/CheckpointInfoCard'




class Checkpoint extends Component {
  constructor(props){
    super(props);
      this.state={
        team: {},
        date: '',
        assessments: [],
        currentCheckpoint: true,
      }
  }

  fetchCurrentCheckpoint = () =>{
    const { id } = this.props.match.params;
    checkpointService.getOne(id)
      .then( (checkpoint) =>{
        this.setState(checkpoint);
      })
      .catch((err) => console.log(err));
  }

  fetchCurrentTeam = () =>{
    const{ _id } = this.props.user
    console.log(_id)
    userService.getOne(_id)
      .then((userData)=>{
        console.log(userData)
        
        console.log(userData.team._id)
        teamsService.getOne(userData.team._id)
        .then( (team) =>{
          console.log('team', team)
          this.setState({team});
        })
        .catch((err) => console.log(err));
      })
  }

  componentDidMount() {
    this.fetchCurrentTeam();
    this.fetchCurrentCheckpoint();
  }

  render() {
    console.log('this.props', this.props)
    console.log('this.props.user.team', this.props.user.team)
    console.log('this.props.match.params', this.props.match.params)
    console.log('this.state',this.state)
    const {team, assessments} = this.state
    console.log('team', team)
    console.log('team.members', team.members)
    console.log('assessments', assessments)

    return (
      <div>
        <h2>Team: {team.name}</h2>

        {
        team.members ?
        <CheckpointInfoCard assessments={assessments} members={team.members}/>
        :
        null
        }


      </div>
    )
  }
}

export default withAuth(Checkpoint);