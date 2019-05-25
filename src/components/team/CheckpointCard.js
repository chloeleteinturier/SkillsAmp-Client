import React, { Component } from 'react'

import checkpointService from './../../lib/checkpoint-service';



export default class CheckpointCard extends Component {
  constructor(props){
    super(props);
    this.state={
      checkpointsData:[]
    }
  }

  fetchCheckpoint = () =>{
    this.props.team.checkpoints.map((checkpointId)=>{
      return checkpointService.getOne(checkpointId)
        .then((data)=>{
          const checkpointsDataCopy = this.state.checkpointsData
          checkpointsDataCopy.push(data)
          this.setState({membersData:checkpointsDataCopy})
        })
    })
  }

  componentDidMount(){
    this.fetchCheckpoint()
  }

  render() {
    const {checkpointsData} = this.state
    console.log(checkpointsData)
    return (
      <div>
        {
          checkpointsData.map((oneCheckpoint)=>{
            return (
              <div key={oneCheckpoint._id} style={{border: '1px solid black'}}>
                <p>{oneCheckpoint.date}</p>
                <p>{(oneCheckpoint.currentCheckpoint).toString()} </p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
