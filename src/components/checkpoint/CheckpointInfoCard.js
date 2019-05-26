import React, { Component } from 'react'

import userService from './../../lib/users-service'
import AssessmentCard from './AssessmentCard'

export default class CheckpointInfoCard extends Component {
  constructor(props){
    super(props);
    this.state={
      membersData:[],
    }
  }

  fetchMembers = () =>{
    this.props.members.map((memberId)=>{
      return userService.getOne(memberId)
        .then((data)=>{
          const membersDataCopy = this.state.membersData
          membersDataCopy.push(data)
          this.setState({membersData:membersDataCopy})
        })
    })
  }

  displayAssessments = () =>{
    this.state.membersData.map((oneMember)=>{
      console.log(oneMember)
      let memberEvaluated;
      let assessmentGrowthCompass;

      this.props.assessments.forEach((assessment)=>{
        console.log(assessment.evaluator)
        if(assessment.evaluator === oneMember._id){
          console.log(true)
          assessmentGrowthCompass = assessment.growthCompass
          userService.getOne(assessment.evaluated)
            .then((user)=>{
              memberEvaluated = `${user.firstName} ${user.lastName}`
            })
        }
      })
      console.log(memberEvaluated)
      console.log(assessmentGrowthCompass)
      return (
        <div key={oneMember._id}>
          <img src={oneMember.photoUrl} alt={oneMember.firstName}/>
          <p>{oneMember.firstName} {oneMember.lastName}</p>
          <p>{assessmentGrowthCompass.name}</p>
          <p>{memberEvaluated}</p>
        </div>
      )
    })
  }

  componentDidMount(){
    this.fetchMembers()
    this.displayAssessments()
  }

  render() {
    const {membersData} = this.state
    const {assessments} = this.props
    console.log('this.props.assessments', this.props.assessments)
    console.log('membersData', membersData)
    return (
      <div>
        {
          this.state.membersData.map((oneMember)=>{
            console.log(oneMember)
            return(
              <div key={oneMember._id}>
                <img src={oneMember.photoUrl} alt={oneMember.firstName}/>
                <p>{oneMember.firstName} {oneMember.lastName}</p>
                <AssessmentCard currentMember={oneMember._id} assessments={assessments} membersData={membersData}/>
              </div>

            )
          })
        }
      </div>
    )
  }
}