import React, { Component } from 'react'

export default class AssessmentCard extends Component {
  constructor(props){
    super(props);
    this.state={
      theGrowthCompass: this.props.growthCompass
    }
  }

  displayIndicators = () =>{
    const {growthCompass} = this.props
    growthCompass.indicators.map((oneIndicator)=>{
      console.log(oneIndicator)
      return (
        <div key={oneIndicator._id}>
          <p>{oneIndicator.name}</p>
          <p>{oneIndicator.assessedLevel}</p>
        </div>
      )
    })
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    const {theGrowthCompass} = this.state
    console.log('name', name)
    console.log('value', value)
    let newIndicators = theGrowthCompass.indicators.map((indicator) => {
      if(indicator._id === name){
        indicator.assessedLevel = value
        return indicator
      } else {
        return indicator
      }
    })
    const theGrowthCompassCopy = theGrowthCompass
    theGrowthCompassCopy.indicators = newIndicators

    console.log(newIndicators)
    this.setState( {theGrowthCompass: theGrowthCompassCopy} );
  }

  handleFormSubmit = (event) => {
    console.log(event)
    event.preventDefault();
    const {theGrowthCompass} = this.state
    this.props.updateTheAssessment(theGrowthCompass); 	
  };

  render() {
    const {growthCompass} = this.props
    const {theGrowthCompass} = this.state
    console.log('this.props', this.props)
    console.log('growthCompass', growthCompass)
    console.log('this.state.theGrowthCompass', theGrowthCompass)
    return (
      <div>
        <h3>{growthCompass.name}</h3>
        {
          growthCompass.indicators.map((oneIndicator)=>{
            console.log(oneIndicator)
            return (
              <div key={oneIndicator._id}>
                <p>{oneIndicator.name}: {oneIndicator.assessedLevel}</p>

                <form>
                  <input type="number" name={oneIndicator._id} min="0" max="5" step="0.5" value={oneIndicator.assessedLevel} onChange={(event)=>this.handleChange(event)}/>
                </form>
              </div>
            )
          })
        }

        <button onClick={(event)=>this.handleFormSubmit(event)} >Send the assessment</button>
      </div>
    )
  }
}
