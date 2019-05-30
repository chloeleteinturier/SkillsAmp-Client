import React, { Component } from 'react'

import userService from './../../lib/users-service';
import PolarChart from './../PolarChart'


export default class AssessmentCard extends Component {
  constructor(props){
    super(props);
    this.state={
      evaluator: {},
      data: [],
      labels: []
    }
  }

  componentDidMount() {
    //  fetch the data from API befor initial render
    const {assessment} = this.props
    userService.getOne(assessment.evaluator)
      .then((theEvaluator)=>{
        this.setState({ evaluator: theEvaluator })
      })
    this.fetchLabels()
    this.fetchAssessedLevelData()

  }

  fetchLabels = () =>{
    const {assessment} = this.props
    const labels = assessment.growthCompass.indicators.map((oneIndicator)=>{
      return oneIndicator.name
    })
    this.setState({labels})
  }

  fetchAssessedLevelData = () =>{
    const {assessment} = this.props
    const data = assessment.growthCompass.indicators.map((oneIndicator)=>{
      return oneIndicator.assessedLevel
    })
    this.setState({data})
  }


  render() {
    const {evaluator, data, labels} = this.state

    return (

      <div className="card p-1 text-center mate-assess-card">                
        {
          data.length?
            <PolarChart data={data} labels={labels} animation={true} displayLabel={false} height={100} />
          :
          null
        }
        <p className="card-text mt-3">{evaluator.firstName} {evaluator.lastName} assess</p>
      </div>


    )
  }
}

