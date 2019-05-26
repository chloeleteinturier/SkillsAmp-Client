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
    const day = String(betterDate.getDay());
    let dayString;

    switch (day) {
      case '1':
        dayString = 'Mon';
        break;
      case '2':
        dayString = 'Tue';
        break;
      case '3':
        dayString = 'Wen';
        break;
      case '4':
        dayString = 'Thu';
        break;
      case '5':
        dayString = 'Fry';
        break;
      case '6':
        dayString = 'Sat';
        break;
      case '0':
        dayString = 'Sun';
        break;
      default:
        break;
    }

    const dd = String(betterDate.getDate()).padStart(2, '0');
    const mm = String(betterDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = betterDate.getFullYear();

    betterDate = `${dayString} ${dd}/${mm}/${yyyy}`;
    console.log(betterDate)
    return (
      <p>{betterDate}</p>
    )
  }

  render() {
    const {team} = this.props
    console.log(' this.props.team',team)
    return (
      <div>
        {
          team.checkpoints.map((oneCheckpoint)=>{
            return (
              <Link to={`/myTeam/${this.props.team._id}/checkpoint/${oneCheckpoint._id}`} key={oneCheckpoint._id} team={this.props.team} checkpoint={oneCheckpoint}>
                {
                  this.getTheDate(oneCheckpoint.date)
                }
                <p>{(oneCheckpoint.currentCheckpoint).toString()} </p>
              </Link>
            )
          })
        }
      </div>
    )
  }
}
