import React from 'react'
import { Link } from 'react-router-dom';

import logo from './../assets/logo.jpeg'


function landingPage() {
  return (
    <div>
      <img src={logo} alt="SkillsAmp"/>
      <Link to={"/login"}> Login</Link>
      <Link to={"/signup"}> Signup</Link>
    </div>
  )
}

export default landingPage
