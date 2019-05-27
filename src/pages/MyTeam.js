import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import teamsService from './../lib/teams-service';
import checkpointService from './../lib/checkpoint-service';

import TeamMemberCard from './../components/team/TeamMemberCard'
import CheckpointCard from './../components/team/CheckpointCard'


export default class MyTeam extends Component {
  constructor(props){
    super(props);
    this.state= {
      _id: '',
      name: '',
      members: [],
      growthModel: '',
      checkpoints: [],
      assessments:[],
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    teamsService.getOne(id)
      .then( (team) =>{
        console.log('team', team)
        this.setState(team);
      })
      .catch((err) => console.log(err));
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
    console.log(assessments)


    return assessments;
  }

  handleCheckpointCreation = (event) => {
    event.preventDefault();
    const {checkpoints, _id, members} = this.state;
    console.log(event)

    const assess = this.createAssessments(members)
    console.log(assess)
    this.setState({assessments: assess})
    console.log('this.state', this.state)
    
    checkpointService.createCheckpoint(assess)
      .then((data)=>{
        console.log('new checkpoint:', data)
        checkpoints.unshift(data._id)
        this.setState(checkpoints)

        teamsService.updateOne(_id, checkpoints )
          .then((result)=>{
          console.log(result)
        })
        this.props.history.push(`/myTeam/${_id}/checkpoint/${data._id}`);
      })
      .catch( error => console.log(error) )
      
  }

  render() {
    const {name, members, checkpoints} = this.state
    console.log('this.state.', this.state)
    console.log('members', members)
    console.log('members.length', members.length)
    // console.log('this.team.length', team.length)
    console.log(checkpoints)
    console.log(checkpoints.length)

    return (
      <div>
      <Link to='/'><h1>SkillsAmp</h1></Link>

        <p>My team: {name}</p>
        {
          members.length ?
          <TeamMemberCard team={this.state}/>
          :
          null
        }
        {
          checkpoints.length ?
          <CheckpointCard team={this.state}/>
          :
          null
        }

        <button type="submit" onClick={(event)=>this.handleCheckpointCreation(event)} >Create new checkpoint</button>
        
      </div>
    )
  }
}
