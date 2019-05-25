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
      team: []
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    teamsService.getOne(id)
      .then( (team) =>{
        this.setState( {team: team});
      })
      .catch((err) => console.log(err));
  }

  handleCheckpointCreation = (event) => {
    event.preventDefault();
    const {team} = this.state;
    console.log(event)
    checkpointService.createCheckpoint()
      .then((data)=>{
        console.log('new checkpoint:', data)
        team.checkpoints.unshift(data._id)
        teamsService.updateOne(team._id, team.checkpoints )
          .then((result)=>{
          console.log(result)
          })
        // })
        // this.props.history.push('/profile');
      })
      .catch( error => console.log(error) )

  }

  render() {
    const {team} = this.state
    console.log('this.state.team', team)
    console.log('this.team.length', team.length)
    console.log(team.checkpoints)

    return (
      <div>
      <Link to='/'><h1>SkillsAmp</h1></Link>

        <p>My team: {team.name}</p>
        {/* {
          membersFirstName.map((memberFirstName, index) => {
            return <TeamMemberCard key={index} firstName={memberFirstName} surname={membersSurname[index]} photo={membersPhoto[index]} />
          })
        } */}
        {
          team.length !== 0 ?
          <TeamMemberCard team={team}/>
          :
          null
        }
        {
          team.checkpoints ?
          <CheckpointCard team={team}/>
          :
          null
        }

        <button type="submit" onClick={(event)=>this.handleCheckpointCreation(event)} >Create new checkpoint</button>
        
      </div>
    )
  }
}
