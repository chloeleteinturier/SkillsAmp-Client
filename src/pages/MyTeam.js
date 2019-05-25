import React, { Component } from 'react'

import teamsService from './../lib/teams-service';
import userService from './../lib/users-service';

import TeamMemberCard from './../components/team/TeamMemberCard';

export default class MyTeam extends Component {
  constructor(props){
    super(props);
    this.state= {
      name: '',
      members: [],
      growthModel: '',
      membersFirstName: [],
      membersSurname: [],
      membersPhoto: [],
    }
  }

  updateState = (user) =>{
    const membersFirstNameCopy = this.state.membersFirstName;
    const membersSurnameCopy = this.state.membersSurname;
    const membersPhotoCopy = this.state.membersPhoto;
    console.log(user)
    membersFirstNameCopy.push(user.firstName)
    console.log(membersFirstNameCopy)
    membersSurnameCopy.push(`${user.lastName}`)
    membersPhotoCopy.push(`${user.photoUrl}`)
    console.log('user',user)
    this.setState({
      membersFirstName: membersFirstNameCopy,
      membersSurname: membersSurnameCopy,
      membersPhoto: membersPhotoCopy
    })
  }

  findMembers = () =>{
    console.log(this.state.members)
    this.state.members.forEach((memberId)=>{
      userService.getOne(memberId)
        .then((member)=>{
          console.log('member',member)
          this.updateState(member)
        })
    })
  }
  

  componentDidMount() {
    const { id } = this.props.match.params;
    teamsService.getOne(id)
      .then( (apiResponse) =>{
        const theTeam = apiResponse.data;
        this.setState(theTeam);
        this.findMembers()
      })
      .catch((err) => console.log(err));
      
  }

  render() {
    console.log('this.state.members', this.state.members)
    console.log('this.state', this.state)
    const {membersFirstName, membersSurname, membersPhoto } = this.state;

    return (
      <div>
        <p>My team: {this.state.name}</p>
        {
          membersFirstName.map((memberFirstName, index) => {
            return(
              <TeamMemberCard key={index} firstName={memberFirstName} surname={membersSurname[index]} photo={membersPhoto[index]}   />
            )
          })

        }
        
      </div>
    )
  }
}
