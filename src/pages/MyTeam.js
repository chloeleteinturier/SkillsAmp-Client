import React, { Component } from 'react'

import { withAuth } from './../providers/AuthProvider';

import userService from './../lib/users-service';
import teamsService from './../lib/teams-service';
import checkpointService from './../lib/checkpoint-service';
import finalCompassService from './../lib/finalCompass-service';

import Navbar from './../components/Navbar'
import TeamMemberCard from './../components/team/TeamMemberCard'
import CheckpointCard from './../components/team/CheckpointCard'



class MyTeam extends Component {
  constructor(props){
    super(props);
    this.state= {
      _id: '',
      name: '',
      members: [],
      growthModel: '',
      checkpoints: [],
      user: {},
      // assessments:[],
      // finalAssessmentsId: []
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const {user} = this.props

    teamsService.getOne(id)
      .then( (team) =>{
        console.log('team', team)
        this.setState(team);
      })
      .catch((err) => console.log(err));

    userService.getOne(user._id)
      .then((oneUser)=>{
        this.setState({ user: oneUser })
      })
  }

  createAssessments = (membersID) => {
    let evaluator;
    let evaluated;
    const {growthModel} = this.state
    const growthCompass = growthModel;
    const assessments = membersID.flatMap((torMemberId)=>{
      evaluator = torMemberId
      return membersID.map((tedMemberId)=>{
        evaluated = tedMemberId
        return {evaluator, evaluated, growthCompass:growthCompass }
      })
    })
    return assessments;
  }

  doCreateFinalCompass = (membersID) => {
    const {id} = this.props.match.params
    const finalAssessmentsPromises = membersID.map((OneMemberId)=>{
      let oneFinalAssessmentId
      let evaluated = OneMemberId;
      let growthCompass = this.state.growthModel
      let team = id
      return finalCompassService.createFinalCompass(evaluated , growthCompass, team )
        .then((finalCompass)=>{
          oneFinalAssessmentId = finalCompass._id
          return oneFinalAssessmentId
        })
    })
    Promise.all(finalAssessmentsPromises)
      .then((finalAssessments) => {
        console.log("finalAssessments",finalAssessments)
        const assess = this.createAssessments(this.state.members)
        console.log('assess', assess)

        checkpointService.createCheckpoint(assess, finalAssessments)  //add ,finalAssessments  after assess
          .then((data)=>{
            console.log('new checkpoint:', data)
            this.state.checkpoints.unshift(data._id)
            this.setState(this.state.checkpoints)

            teamsService.updateOne(this.state._id, this.state.checkpoints )
              .then((result)=>{
              console.log(result)
            })
            this.props.history.push(`/myTeam/${this.state._id}/checkpoint/${data._id}`);
          })
          .catch( error => console.log(error) )

      })
  }


  handleCheckpointCreation = (event) => {
    event.preventDefault();
    const {members} = this.state;

    this.doCreateFinalCompass(members)      
  }

  render() {
    const {name, members, checkpoints, user} = this.state
    console.log('this.state.', this.state)
    console.log(this.props.match)


    return (
    <div className="container-fluid content">
      <div className="row">
        <Navbar theUser={user} />

        <div className="col- col-sm- col-md- col-lg-10 col-xl- mainview pt-3 pb-3">
          <h1 className="h4 text-center mt-4 mb-4">My team: <strong className="font-weight-bold">{name}</strong></h1>
          {
            members.length ?
            <TeamMemberCard team={this.state}/>
            :
            null
          }
          <button className='btn btn-primary ml-auto mr-auto d-block mb-3' onClick={(event)=>this.handleCheckpointCreation(event)}>Create new Checkpoint</button>
          {
            checkpoints.length ?
            <CheckpointCard team={this.state}/>
            :
            null
          }


        </div>
      

      </div>
    </div>
    )
  }
}

export default withAuth(MyTeam)