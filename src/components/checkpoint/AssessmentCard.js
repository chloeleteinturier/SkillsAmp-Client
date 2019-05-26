import React, { Component } from 'react'

export default class AssessmentCard extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  render() {
    const {currentMember, assessments, membersData } = this.props
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
              return (
                <div key={assessment._id}>
                  <p>Member to evaluate: {memberEvaluated.firstName} {memberEvaluated.lastName}</p>
                  <p>{assessmentGrowthCompass.name}</p>
                </div>
              )
            } else{
              return null
            }
          })
      
        }
      </div>
    )
  }
}
