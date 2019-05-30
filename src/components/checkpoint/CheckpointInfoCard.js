import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import userService from './../../lib/users-service'
import AssessmentInfoCard from './AssessmentInfoCard'

export default class CheckpointInfoCard extends Component {
  constructor(props){
    super(props);
    this.state={
      membersData:[],
      allDone: true
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

  checkIfAssessmentsAllDone = () =>{
    const {assessments} = this.props;
    assessments.forEach((assessment)=>{
      if(assessment.done === false){
        this.setState({allDone: false})
      }
    })
  }

  componentDidMount(){
    this.fetchMembers()
    this.checkIfAssessmentsAllDone()
  }

  render() {
    const {membersData, allDone,} = this.state
    const {assessments, checkpointId, teamId, finalAssessments} = this.props
    console.log('this.state',this.state)
    console.log('this.props', this.props)
    return (
      <div className="container container-block pt-4 mb-4 d-flex flex-wrap">
        {
          this.state.membersData.map((oneMember)=>{
            return(
           
              <div key={oneMember._id} className="card my-team-member p-1">
                <div className="profile-pic m-auto">
                  <img src={oneMember.photoUrl} alt={oneMember.firstName} />
                </div>
                <div className="card-body">
                <p className="card-text">{oneMember.firstName} {oneMember.lastName}</p>
                  <AssessmentInfoCard currentMember={oneMember._id} assessments={assessments} membersData={membersData} teamId={teamId} checkpointId={checkpointId}/>
                  
                  {
                    allDone?
                    finalAssessments.map((oneFinalAssessment)=>{
                      console.log('this is true')
                      console.log('oneFinalAssessment.evaluated ', oneFinalAssessment.evaluated )
                      console.log('oneMember._id ', oneMember._id)
                      
                      if(oneFinalAssessment.evaluated === oneMember._id){
                        console.log('this is true')
                        return(
                          <Link to={`/myTeam/${teamId}/checkpoint/${checkpointId}/final-assessment/${oneFinalAssessment._id}`} key={oneFinalAssessment._id} className="btn btn-primary mb-3">Final assessment</Link>
                        )
                      }
                      else return null
                    })
                    :
                    null
                  }
                </div>

                
              </div>
            )
          })
        }
      </div>
    )
  }
}