import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';

import teamsService from './../lib/teams-service';
import checkpointService from './../lib/checkpoint-service';


class MyTeam extends Component {
  constructor(props){
    super(props);
      this.state={
        team: {},
        date: '',
        assessments: [],
        currentCheckpoint: true,
      }
  }

  fetchCurrentTeam = () =>{
    const { id } = this.props.match.params;
    checkpointService.getOne(id)
      .then( (checkpoint) =>{
        this.setState(checkpoint);
      })
      .catch((err) => console.log(err));
  }

  fetchCurrentCheckpoint = () =>{
    const { user } = this.props;
    teamsService.getOne(user.team)
      .then( (team) =>{
        this.setState({team});
      })
      .catch((err) => console.log(err));
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
    return (
      <div>
        <p>holaaaaa</p>
      </div>
    )
  }
}

export default withAuth(MyTeam);