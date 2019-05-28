import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { withAuth } from './../../providers/AuthProvider';


class AssessmentCard extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  render() {
    const {currentMember, assessments, membersData, user, checkpointId, teamId } = this.props
    console.log('this.props', this.props)
    return (
      <div>
        {
          assessments.map((assessment)=>{
            if(assessment.evaluated === currentMember){
              let memberEvaluator = {}
              membersData.forEach((member)=>{
                if(assessment.evaluator === member._id){
                  return memberEvaluator = member
                }
              })
              if(assessment.evaluator === user._id && assessment.done === false){
                return (
                  <Link to={`/myTeam/${teamId}/checkpoint/${checkpointId}/assessment/${assessment._id}`} key={assessment._id} className="btn btn-secondary mb-3">Do my assessment</Link>
              )

              }else if(assessment.done === false){
                return (
                  <div key={assessment._id} className="alert alert-warning" role="alert">
                    <strong className="font-weight-bold">{memberEvaluator.firstName} {memberEvaluator.lastName}</strong> <span>Waiting</span>
                  </div>
                )
              } else{
                return (
                  <div key={assessment._id} className="alert alert-success" role="alert">
                    <strong className="font-weight-bold">{memberEvaluator.firstName} {memberEvaluator.lastName}</strong> <span>Done</span>
                  </div>
                )
              }
            } else{
              return null
            }
          })
      
        }
      </div>
    )
  }
}

export default withAuth(AssessmentCard);