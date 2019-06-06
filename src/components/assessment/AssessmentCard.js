import React, { Component } from 'react'

export default class AssessmentCard extends Component {
  constructor(props){
    super(props);
    this.state={
      theGrowthCompass: this.props.growthCompass,
    }
  }

  displayIndicators = () =>{
    const {growthCompass} = this.props
    growthCompass.indicators.map((oneIndicator)=>{
      return (
        <div key={oneIndicator._id}>
          <p>{oneIndicator.name}</p>
          <p>{oneIndicator.assessedLevel}</p>
        </div>
      )
    })
  }

  handleChange = (event) => {
    const {name, value, id} = event.target;
    const {theGrowthCompass} = this.state
    let newIndicators = theGrowthCompass.indicators.map((indicator) => {
      if(indicator._id === name){
        indicator.assessedLevel = parseFloat(value)
        return indicator
      } else {
        return indicator
      }
    })
    const theGrowthCompassCopy = theGrowthCompass
    theGrowthCompassCopy.indicators = newIndicators
    this.setState( {theGrowthCompass: theGrowthCompassCopy} );
    this.props.updateTheData(id, value)
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {theGrowthCompass} = this.state
    this.props.updateTheAssessment(theGrowthCompass); 	
  };

  render() {
    const {growthCompass} = this.props

    return (
      <div className="container container-block pt-4 assessment-form-wrap">
        <form className="needs-validation center-form assessment-form">

        {
          growthCompass.indicators.map((oneIndicator, index)=>{
            return (
              <div key={oneIndicator._id} className="form-group">
                <label htmlFor="formControlRange">{oneIndicator.name}: <span className="font-weight-bold assessment-rate">{oneIndicator.assessedLevel}</span></label>
                <input type="range" className="form-control-range" id={index} name={oneIndicator._id}  min="0" max="4" step="0.1" value={oneIndicator.assessedLevel} onChange={(event)=>this.handleChange(event)}/>                                                       
              </div>
            )
          })
        }

          <button className="btn btn-block btn-primary btn-lg mt-3" type="submit" onClick={(event)=>this.handleFormSubmit(event)}>Save</button>
        </form>
      </div>
    )
  }
}

