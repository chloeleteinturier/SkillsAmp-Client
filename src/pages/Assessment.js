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
      data: []
    }
  }

  componentDidMount() {
    const { checkpointId } = this.props.match.params;
    const {user} = this.props
    userService.getOne(user._id)
      .then((oneUser)=>{
        this.setState({ user: oneUser })
      })

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
    this.setState({data})
  }

  updateTheData = (id, value) =>{
    const {data} = this.state
    console.log('yolo!!!!!!', id, value)
    const dataCopy = data;
    dataCopy[id] = parseFloat(value)
    this.setState({data:dataCopy})
  }

  updateTheAssessment = (theGrowthCompass) =>{
    const { teamId, checkpointId } = this.props.match.params
    const {theAssessment, checkpoint} = this.state
    console.log('youhouuuuuuuu', theGrowthCompass)
    console.log('this.state.theAssessment', theAssessment)

    const checkpointUpdated = checkpoint.assessments.map((oneAssessment)=>{
      if(oneAssessment._id === theAssessment._id){
        oneAssessment.growthCompass = theGrowthCompass
        return oneAssessment
      } else {
        return oneAssessment
      }
    })
    checkpointService.updateOne(checkpoint._id, checkpointUpdated)
      .then((result)=>{
        console.log(result)
        this.props.history.push(`/myTeam/${teamId}/checkpoint/${checkpointId}`);
      })
  
    }

  render() {
    // console.log('this.props', this.props)
    // console.log('this.state', this.state)
    const { theAssessment, memberEvaluated, data, labels, user } = this.state
    const { checkpoint} = this.state
    console.log('checkpoint', checkpoint)

    const { teamId, checkpointId } = this.props.match.params
    // const { assessmentId } = this.props.match.params
    // console.log('theAssessment', theAssessment)
    // console.log('this.state', this.state)
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
                <p className='text-center text-muted mb-0'>You are evaluating yourself with the growth model: {theAssessment.growthCompass.name} </p>
                <p className="text-center mt-0"><Link to={`/myTeam/${teamId}/checkpoint/${checkpointId}`}>Back to the checkpoint</Link></p>
                <AssessmentCard growthCompass={theAssessment.growthCompass} updateTheAssessment={this.updateTheAssessment} updateTheData={this.updateTheData}/>
              </div>
              :
              <div>
                <h1 className="h4 text-center mt-4 mb-4"><span className="font-weight-bold">{memberEvaluated.firstName} {memberEvaluated.lastName}</span> assessment</h1>
                <p className='text-center text-muted mb-0'>You are evaluating {memberEvaluated.firstName} {memberEvaluated.lastName} with the growth model: '{theAssessment.growthCompass.name}' </p>
                <p className="text-center mt-0"><Link to={`/myTeam/${teamId}/checkpoint/${checkpointId}`}>Back to the checkpoint</Link></p>
                <AssessmentCard growthCompass={theAssessment.growthCompass} updateTheAssessment={this.updateTheAssessment} updateTheData={this.updateTheData}/>
              </div>
            }
            {
              data ?
              <div className="container container-block pt-4 mb-4">
                <PolarChart data={data} labels={labels} />
              </div>
              :
              null
            }
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





