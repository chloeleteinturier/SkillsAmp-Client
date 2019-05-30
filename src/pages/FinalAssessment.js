import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';

import userService from './../lib/users-service';
import finalCompassService from './../lib/finalCompass-service';
import checkpointService from './../lib/checkpoint-service';

import Navbar from './../components/Navbar'
import DisplayTeamMembers from './../components/finalAssessment/DisplayTeamMembers'
import PolarChart from './../components/PolarChart'
import AssessmentCard from './../components/assessment/AssessmentCard'




class FinalAssessment extends Component {
  constructor(props){
    super(props);
    this.state={
      user: {},
      finalAssessment: {},
      checkpoint: {},
      labels: [],
      data: [],
      readyToMount: false,
      changedValues: false
    }
  }

  componentDidMount() {
    //  fetch the data from API befor initial render
    const {user} = this.props
    const {checkpointId, finalAssessmentId} = this.props.match.params
    userService.getOne(user._id)
      .then((oneUser)=>{
        this.setState({ user: oneUser })
        finalCompassService.getOne(finalAssessmentId)
          .then((oneFinalAssessment)=>{
            this.setState({ finalAssessment: oneFinalAssessment })
            checkpointService.getOne(checkpointId)
            .then((oneCheckpoint)=>{
              this.setState({ checkpoint: oneCheckpoint })
              this.fetchLabels()
              this.fetchAssessedLevelData()
            })
          })
      })
  }

  fetchLabels = () =>{
    const {finalAssessment} = this.state
    const labels = finalAssessment.growthCompass.indicators.map((oneIndicator)=>{
      return oneIndicator.name
    })
    this.setState({labels})
  }

  fetchAssessedLevelData = () =>{
    const {finalAssessment} = this.state
    const data = finalAssessment.growthCompass.indicators.map((oneIndicator)=>{
      return oneIndicator.assessedLevel
    })
    this.setState({data, readyToMount:true})
  }

  updateTheData = (id, value) =>{
    const {data} = this.state
    const dataCopy = data;
    dataCopy[id] = parseFloat(value)
    this.setState({data:dataCopy, changedValues: true, readyToMount:false})
  }

  updateTheAssessment = (theGrowthCompass) =>{
    const { teamId, checkpointId } = this.props.match.params
    const {finalAssessment,} = this.state

    const finalAssessmentUpdated = finalAssessment
    finalAssessmentUpdated.growthCompass = theGrowthCompass
    finalAssessmentUpdated.done = true

    finalCompassService.updateOne(finalAssessment._id, finalAssessmentUpdated)
      .then((result)=>{
        userService.updateUserCurrentCompass(finalAssessment.evaluated._id, finalAssessment._id)
        this.props.history.push(`/myTeam/${teamId}/checkpoint/${checkpointId}`);
      })
  
    }

  mountChart = () => {
    if(this.state.changedValues && !this.state.readyToMount){
      this.setState({readyToMount:true, changedValues:false})
    }
  }


  render() {
    const {user, checkpoint, finalAssessment, data, labels} = this.state
    return (
      <div className="container-fluid content">
        <div className="row">
          <Navbar theUser={user} />

          <div className="col- col-sm- col-md- col-lg-10 col-xl- mainview pt-3 pb-3">
            {
              finalAssessment.evaluated ?
                finalAssessment.evaluated._id === this.props.user._id ?
                  <h1 className="h4 text-center mt-4 mb-4"><span className="font-weight-bold">My final</span> assessment</h1>
                  :
                  <h1 className="h4 text-center mt-4 mb-4"><span className="font-weight-bold">{finalAssessment.evaluated.firstName} {finalAssessment.evaluated.lastName} final</span> assessment</h1>
              :
              null
            }
            <div className="container container-block pt-4 mb-4 d-flex flex-wrap others-assessments">

              {
                checkpoint.assessments?
                checkpoint.assessments.map((oneAssessment)=>{
                  if(oneAssessment.evaluated === user._id){
                    return(
                    <DisplayTeamMembers key={oneAssessment._id} assessment={oneAssessment}/>
                    )}
                  else{
                    return null
                  }
                })
                :
                null
              }

            </div>

          {
            this.state.readyToMount ?
            <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
              <AssessmentCard growthCompass={finalAssessment.growthCompass} updateTheAssessment={this.updateTheAssessment} updateTheData={this.updateTheData}/>
              <div className="container container-block pt-4 assessment-wheel">
                <PolarChart data={data} labels={labels} animation={false} displayLabel={true} height={50}/>
              </div>
            </div>
            :
            null
          }
          {this.mountChart()}
        </div>
        :
        null
      }


        </div>          
      </div>                                              
    )
  }
}

export default withAuth(FinalAssessment)