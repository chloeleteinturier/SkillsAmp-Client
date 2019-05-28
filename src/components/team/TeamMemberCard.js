import React, { Component } from 'react'

import userService from './../../lib/users-service';



export default class TeamMemberCard extends Component {
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
      <div className="container container-block pt-4 mb-3 d-flex flex-wrap">
        {
          membersData.map((oneMember)=>{
            return (
              <div key={oneMember._id} className="card my-team-member p-1">
                <div className="profile-pic m-auto">
                  <img src={oneMember.photoUrl} alt={oneMember.firstName} />
                </div>
                <div className="card-body">
                  <p className="card-text">{oneMember.firstName} {oneMember.lastName}</p>
                </div>
              </div>                        
            )
          })
        }
      </div>
    )
  }
}
