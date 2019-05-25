import React from 'react'

function TeamMemberCard(props) {
  const { firstName,surname, photo } = props
  return (
    <div>
      <img src={photo} alt={firstName}/>
      <p>{firstName} {surname}</p>
    </div>
  )
}

export default TeamMemberCard
