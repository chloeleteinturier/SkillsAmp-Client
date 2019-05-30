import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { withAuth } from '../providers/AuthProvider';

import checkpointService from './../lib/checkpoint-service'
import userService from './../lib/users-service'

import PolarChart from './../components/PolarChart'
import Navbar from './../components/Navbar'


import AssessmentCard from './../components/assessment/AssessmentCard'

class Assessment extends Component {
  constructor(props){
    super(props);
    this.state={
      user: {},
      checkpoint: {},
      theAssessment : {},
      memberEvaluated: {},
      labels: [],
      data: [],
      readyToMount: false,
      changedValues: false
    }
  }

  componentDidMount() {
    const { checkpointId } = this.props.match.params;
    const {user} = this.props
    userService.getOne(user._id)
      .then((oneUser)=>{
        this.setState({ user: oneUser })
        checkpointService.getOne(checkpointId)
        .then( (currentCheckpoint) =>{
          this.setState({checkpoint:currentCheckpoint});
          this.fetchTheAssessment()
          this.fetchMemberEvaluated()
          })
          .catch((err) => console.log(err));
      })
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
    this.fetchLabels()
    this.fetchAssessedLevelData()
  }

  fetchMemberEvaluated = () =>{
    const { theAssessment } = this.state
    userService.getOne(theAssessment.evaluated)
      .then( (memberEvaluated) =>{
        this.setState({memberEvaluated:memberEvaluated });
        })
        .catch((err) => console.log(err)); 
  }

  fetchLabels = () =>{
    const {theAssessment} = this.state
    const labels = theAssessment.growthCompass.indicators.map((oneIndicator)=>{
      return oneIndicator.name
    })
    this.setState({labels})
  }

  fetchAssessedLevelData = () =>{
    const {theAssessment} = this.state
    const data = theAssessment.growthCompass.indicators.map((oneIndicator)=>{
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
    const {theAssessment, checkpoint} = this.state

    const assessmentsUpdated = checkpoint.assessments.map((oneAssessment)=>{
      if(oneAssessment._id === theAssessment._id){
        oneAssessment.growthCompass = theGrowthCompass
        oneAssessment.done = true
        return oneAssessment
      } else {
        return oneAssessment
      }
    })
    console.log('checkpoint', checkpoint)
    const checkpointUpdated = checkpoint
    checkpointUpdated.assessments =assessmentsUpdated

    console.log('checkpointUpdated', checkpointUpdated)
    checkpointService.updateOne(checkpoint._id, checkpointUpdated)
      .then((result)=>{
        console.log(result)
        this.props.history.push(`/myTeam/${teamId}/checkpoint/${checkpointId}`);
      })
  
    }

    mountChart = () => {
      if(this.state.changedValues && !this.state.readyToMount){
        this.setState({readyToMount:true, changedValues:false})
      }
    }

  render() {
    let { theAssessment, memberEvaluated, data, labels, user } = this.state
    // const { checkpoint} = this.state

    const { teamId, checkpointId } = this.props.match.params

    console.log(this.state.readyToMount)

    console.log(data)

    return (
      <div className="container-fluid content">

        <div className="row">

          <Navbar theUser={user} />

        {
          theAssessment._id ?
          <div className="col- col-sm- col-md- col-lg-10 col-xl- mainview pt-3 pb-3">
            {
              memberEvaluated._id === user._id ?
              <div>
                <h1 className="h4 text-center mt-4 mb-4"><span className="font-weight-bold">My own</span> assessment</h1>
                <p className='text-center text-muted mb-0'>You are evaluating yourself with the growth model: <span className="font-weight-bold">{theAssessment.growthCompass.name}</span> </p>
                <p className="text-center mt-0"><Link to={`/myTeam/${teamId}/checkpoint/${checkpointId}`}>Back to the checkpoint</Link></p>
              </div>
              :
              <div>
                <h1 className="h4 text-center mt-4 mb-4"><span className="font-weight-bold">{memberEvaluated.firstName} {memberEvaluated.lastName}</span> assessment</h1>
                <p className='text-center text-muted mb-0'>You are evaluating {memberEvaluated.firstName} {memberEvaluated.lastName} with the growth model: '{theAssessment.growthCompass.name}' </p>
                <p className="text-center mt-0"><Link to={`/myTeam/${teamId}/checkpoint/${checkpointId}`}>Back to the checkpoint</Link></p>
              </div>
            }
            {
              this.state.readyToMount ?
              <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                <AssessmentCard growthCompass={theAssessment.growthCompass} updateTheAssessment={this.updateTheAssessment} updateTheData={this.updateTheData}/>
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

export default withAuth(Assessment)





