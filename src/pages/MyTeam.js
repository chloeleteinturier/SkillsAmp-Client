import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import teamsService from './../lib/teams-service';

import TeamMemberCard from './../components/team/TeamMemberCard'


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
      .then( (apiResponse) =>{
        this.setState( {team: apiResponse.data});
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log('this.state.members', this.state.members)
    console.log('this.state', this.state)
    console.log('this.state.team', this.state.team)
    console.log('this.props', this.props)
    console.log('this.state.team.length', this.state.team.length)

    return (
      <div>
      <Link to='/'><h1>SkillsAmp</h1></Link>

        <p>My team: {this.state.team.name}</p>
        {/* {
          membersFirstName.map((memberFirstName, index) => {
            return <TeamMemberCard key={index} firstName={memberFirstName} surname={membersSurname[index]} photo={membersPhoto[index]} />
          })
        } */}
        {
          this.state.team.length !== 0 ?
          <TeamMemberCard team={this.state.team}/>
          :
          null
        }
        
      </div>
    )
  }
}
