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
    const {currentMember, assessments, membersData, user } = this.props
    console.log('me', user)
    console.log('this.props', this.props)
    console.log(this.state)
    return (
      <div>
        {
          assessments.map((assessment)=>{
            if(assessment.evaluator === currentMember){
              let assessmentGrowthCompass = assessment.growthCompass
              let memberEvaluated = {}
              membersData.forEach((member)=>{
                if(assessment.evaluated === member._id){
                  return memberEvaluated = member
                }
              })
              if(currentMember === user._id){
                return (
                <Link to='#/' key={assessment._id}>
                  <p>Member to evaluate: {memberEvaluated.firstName} {memberEvaluated.lastName}</p>
                  <p>{assessmentGrowthCompass.name}</p>
                </Link>
              )

              }else{

              return (
                <div key={assessment._id}>
                  <p>Member to evaluate: {memberEvaluated.firstName} {memberEvaluated.lastName}</p>
                  <p>{assessmentGrowthCompass.name}</p>
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