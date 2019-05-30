import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';


import teamsService from './../lib/teams-service';
import checkpointService from './../lib/checkpoint-service';
import userService from './../lib/users-service';

import Navbar from './../components/Navbar'
import CheckpointInfoCard from './../components/checkpoint/CheckpointInfoCard'




class Checkpoint extends Component {
  constructor(props){
    super(props);
      this.state={
        user:{},
        team: {},
        date: '',
        assessments: [],
        currentCheckpoint: true,
        finalAssessments: [],
      }
  }

  fetchCurrentCheckpoint = () =>{
    const { checkpointId } = this.props.match.params;
    checkpointService.getOne(checkpointId)
      .then( (checkpoint) =>{
        console.log('checkpoint',checkpoint)
        this.setState(checkpoint);
      })
      .catch((err) => console.log(err));
  }

  fetchCurrentTeam = () =>{
    const{ _id } = this.props.user
    userService.getOne(_id)
      .then((userData)=>{
        teamsService.getOne(userData.team._id)
        .then( (team) =>{
          this.setState({team});
        })
        .catch((err) => console.log(err));
      })
  }

  getTheDate= (checkpointDate) =>{
    let betterDate = new Date(JSON.parse(`"${checkpointDate}"`))

    const dd = String(betterDate.getDate()).padStart(2, '0');
    const mm = String(betterDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = betterDate.getFullYear();

    betterDate = `${dd}/${mm}/${yyyy}`;
    return (
      <span>{betterDate}</span>
    )
  }

  componentDidMount() {
    const {user} = this.props
    userService.getOne(user._id)
      .then((oneUser)=>{
        this.setState({ user: oneUser })
      })
    this.fetchCurrentTeam();
    this.fetchCurrentCheckpoint();
  }

  render() {
    const { team, assessments, user, date, finalAssessments } = this.state
    const {checkpointId, teamId} = this.props.match.params

    return (
      <div className="container-fluid content">

        <div className="row">

          <Navbar theUser={user} />

          <div className="col- col-sm- col-md- col-lg-10 col-xl- mainview pt-3 pb-3">
            <h1 className="h4 text-center mt-4 mb-2">Checkpoint: <strong className="font-weight-bold">{this.getTheDate(date)}</strong></h1>
            <h2 className="h5 text-center mb-4">My team: <strong className="font-weight-bold">{team.name}</strong></h2>

              {
              team.members ?
              <CheckpointInfoCard assessments={assessments} finalAssessments={finalAssessments} members={team.members} me={this.props.user} teamId={teamId} checkpointId={checkpointId}/>
              :
              null
              }

          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Checkpoint);