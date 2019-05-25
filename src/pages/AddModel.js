import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class AddModel extends Component {
  
  state ={
    name: '',
    indicators: [{
      name: '',
      levelOne: '',
      levelTwo: '',
      levelThree: '',
      levelFour: '',
      assessedLevel: 0
     }]
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    console.log(name)
    console.log(value)
    this.setState({[name]: value});
    console.log(this.state)
  }

  render() {
    const { name, indicators } = this.state;

    return (
      <div>
      <Link to='/'><h1>SkillsAmp</h1></Link>

        <h3>Create new growth Model</h3>
        <form>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange}/>
          <br/>
          <label>Indicators:</label>
          <div style={{paddingLeft:'30px'}} >
            <label>Name:</label>
            <input type="text" name="indicators[name]" value={indicators[name]} onChange={this.handleChange}/>
            <br/>
            <label>Level 1:</label>
            <input type="text" name="indicators.levelOne" value={indicators.levelOne} onChange={this.handleChange}/>
            <br/>
            <label>Level 2:</label>
            <input type="text" name="indicators.levelTwo" value={indicators.levelTwo} onChange={this.handleChange}/>
            <br/>
            <label>Level 3:</label>
            <input type="text" name="indicators.levelThree" value={indicators.levelThree} onChange={this.handleChange}/>
            <br/>
            <label>Level 4:</label>
            <input type="text" name="indicators.levelFour" value={indicators.levelFour} onChange={this.handleChange}/>
          </div>
          <br/>
        </form>
      </div>
    )
  }
}
