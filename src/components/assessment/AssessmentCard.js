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
    console.log('event.target.id', event.target.id)
    console.log('event.target', event.target)
    console.log('event', event)
    console.log('event.target', event.target)
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
    // console.log(event)
    event.preventDefault();
    const {theGrowthCompass} = this.state
    this.props.updateTheAssessment(theGrowthCompass); 	
  };

  render() {
    const {growthCompass} = this.props
    const {theGrowthCompass} = this.state
    return (
      <div className="container container-block pt-4 pb-4">
        <form className="needs-validation center-form assessment-form">

        {/* <h3>{growthCompass.name}</h3> */}
        {
          growthCompass.indicators.map((oneIndicator, index)=>{
            return (
              <div className="form-group">
                <label htmlFor="formControlRange">{oneIndicator.name}: <span className="font-weight-bold assessment-rate">{oneIndicator.assessedLevel}</span></label>
                <input type="range" className="form-control-range" id={index} name={oneIndicator._id}  min="0" max="4" step="0.1" value={oneIndicator.assessedLevel} onChange={(event)=>this.handleChange(event)}/>                                                       
              </div>
            )
          })
        }

          <button className="btn btn-block btn-primary btn-lg" type="submit" onClick={(event)=>this.handleFormSubmit(event)}>Save assessment</button>
        </form>
      </div>
    )
  }
}

