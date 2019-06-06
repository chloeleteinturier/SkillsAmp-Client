import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class CheckpointCard extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  getTheDate= (checkpointDate) =>{
    let betterDate = new Date(JSON.parse(`"${checkpointDate}"`))

    const dd = String(betterDate.getDate()).padStart(2, '0');
    const mm = String(betterDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = betterDate.getFullYear();

    betterDate = `${dd}/${mm}/${yyyy}`;
    return (
      <span>{betterDate}</span>
    )
  }

  render() {
    const {team} = this.props
    return (
        <div className="container container-block pt-4 mb-4">
          <h5 className="h5 mb-3">Assessment checkpoints</h5>
        {
          team.checkpoints ?
            team.checkpoints.map((oneCheckpoint)=>{
              return (
                <div key={oneCheckpoint._id} className="list-group list-group-flush">
                  <Link to={`/myteam/${this.props.team._id}/checkpoint/${oneCheckpoint._id}`} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <p className="mb-1"><strong className="font-weight-bold">{this.getTheDate(oneCheckpoint.date)}</strong></p>
                      {
                        oneCheckpoint.currentCheckpoint ?
                        <small>true</small>
                        :
                        <small>false</small>
                      }
                    </div>
                  </Link>
                </div>
              )
            })
          :
          null
        }
        </div>
    )
  }
}
