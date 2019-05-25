import React, { Component } from 'react'

import userService from './../../lib/users-service';



export default class TeamCard extends Component {
  constructor(props){
    super(props);
    this.state={
      membersData:[]
    }
  }

  fetchMembers = () =>{
    this.props.team.members.map((memberId)=>{
      return userService.getOne(memberId)
        .then((data)=>{
          const membersDataCopy = this.state.membersData
          membersDataCopy.push(data)
          this.setState({membersData:membersDataCopy})
        })
    })
  }

  componentDidMount(){
    this.fetchMembers()
  }

  render() {
    const {membersData} = this.state
    return (
      <div>
        {
          membersData.map((oneMember)=>{
            return (
              <div key={oneMember._id}>
                <img src={oneMember.photoUrl} alt={oneMember.firstName}/>
                <p>{oneMember.firstName} {oneMember.lastName}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
