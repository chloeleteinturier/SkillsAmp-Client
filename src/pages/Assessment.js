import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { withAuth } from '../providers/AuthProvider';

import checkpointService from './../lib/checkpoint-service'
import userService from './../lib/users-service'


// import Navbar from './../components/Navbar'
import AssessmentCard from './../components/assessment/AssessmentCard'

class Assessment extends Component {
  constructor(props){
    super(props);
    this.state={
      checkpoint: {},
      theAssessment : {},
      memberEvaluated: {}
    }
  }

  componentDidMount() {
    const { checkpointId } = this.props.match.params;
    checkpointService.getOne(checkpointId)
      .then( (currentCheckpoint) =>{
        this.setState({checkpoint:currentCheckpoint});
        this.fetchTheAssessment()
        this.fetchMemberEvaluated()
        })
        .catch((err) => console.log(err));
    }
  
  fetchTheAssessment = () =>{
    const { assessmentId } = this.props.match.params
    this.state.checkpoint.assessments.forEach((assess) => {
      if(assess._id === assessmentId){
        return (
          this.setState({theAssessment: assess})
        )
      }
    })
  }

  fetchMemberEvaluated = () =>{
    const { theAssessment } = this.state
    userService.getOne(theAssessment.evaluated)
      .then( (memberEvaluated) =>{
        this.setState({memberEvaluated:memberEvaluated });
        })
        .catch((err) => console.log(err)); 
  }

  updateTheAssessment = () =>{
    console.log('youhouuuuuuuu')
  }
  


  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    const { theAssessment, memberEvaluated } = this.state
    // const { checkpoint} = this.state

    const { user } = this.props
    const { teamId, checkpointId } = this.props.match.params
    // const { assessmentId } = this.props.match.params
    console.log('theAssessment', theAssessment)
    return (
      <div>
        <Link to='/'><h1>SkillsAmp</h1></Link>
        <Link to={`/myTeam/${teamId}`}>Back to MyTeam</Link>
        <br/>
        <Link to={`/myTeam/${teamId}/checkpoint/${checkpointId}`}>Back to the session</Link>

        {
          theAssessment._id ?
          <div>
            {
              memberEvaluated._id === user._id ?
              <div>
                <p>you are evaluating yourself with the growth model: {theAssessment.growthCompass.name} </p>
                <AssessmentCard growthCompass={theAssessment.growthCompass} updateTheAssessment={this.updateTheAssessment}/>
              </div>
              :
              <div>
                <p>you are evaluating {memberEvaluated.firstName} {memberEvaluated.lastName} with the growth model: '{theAssessment.growthCompass.name}' </p>
                <AssessmentCard growthCompass={theAssessment.growthCompass} updateTheAssessment={this.updateTheAssessment}/>
              </div>
            }
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default withAuth(Assessment)





