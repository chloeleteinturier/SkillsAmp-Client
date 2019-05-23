import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

// import CurrentGrowthCompassCard from './../components/profile/CurrentGrowthCompassCard'
// import TeamCard from './../components/profile/TeamCard'
// import TaskCard from './../components/profile/TaskCard'
// import EvolutionCard from './../components/profile/EvolutionCard'

class Profile extends Component {
  render() {
    const { user, photoUrl } = this.props
    return (
      <div>
        <h1>Welcome {user.firstName}</h1>
        <img src={photoUrl} alt="me"/>
        <br/>
        <Link to='/add-model'>Add new growth Model</Link>
        <br/>
        <Link to='/create-team'>Create a new team</Link>
        {/* <CurrentGrowthCompassCard /> */}
        {/* <TeamCard /> */}
        {/* <TaskCard /> */}
        {/* <EvolutionCard /> */}
      </div>
    )
  }
}

export default withAuth(Profile);