import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { withAuth } from '../providers/AuthProvider';

import checkpointService from './../lib/checkpoint-service'


import Navbar from './../components/Navbar'

class Assessment extends Component {
  constructor(props){
    super(props);
    this.state={
      checkpoint: {},
      theAssessment : {}
    }
  }

  componentDidMount() {
    const { checkpointId, assessmentId } = this.props.match.params;
    checkpointService.getOne(checkpointId)
      .then( (currentCheckpoint) =>{
        console.log('checkpoint', currentCheckpoint)
        this.setState({checkpoint:currentCheckpoint});
        this.fetchTheAssessment()
        })
        .catch((err) => console.log(err));
    }
  
  fetchTheAssessment = () =>{
    const {teamId, checkpointId, assessmentId} = this.props.match.params
    this.state.checkpoint.assessments.forEach((assess) => {
      if(assess._id === assessmentId){
        return (
          this.setState({theAssessment: assess})
        )
      }
    })
  }
  


  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    console.log(this.props.match.params)
    const {checkpoint, theAssessment} = this.state
    const {user} = this.props
    const {teamId, checkpointId, assessmentId} = this.props.match.params
    console.log(theAssessment._id)
    return (
      <div>
        <Navbar />
        <Link to='/'><h1>SkillsAmp</h1></Link>
        <Link to={`/myTeam/${teamId}`}>Back to MyTeam</Link>
        <br/>
        <Link to={`/myTeam/${teamId}/checkpoint/${checkpointId}`}>Back to the session</Link>

        {
          theAssessment._id ?
          <div>

            <p>you are evaluating {theAssessment.evaluated} with the growth model: '{theAssessment.growthCompass.name}' </p>

          </div>
          :
          null
        }


      </div>
    )
  }
}

export default withAuth(Assessment)





