import React from 'react'
import { Link } from 'react-router-dom';

import largeLogo from "./../assets/logo_skillsamp_L.png"


function landingPage() {
  return (
    <div className="cover-container text-center">
        <header className="landing-header p-5">
          <img src={largeLogo} alt="Skillsamp" />
        </header>
        <main className="landing-info p-5">
          <h1 className="cover-heading h2">Become a better professional<br />boosting your professional growth</h1>
          <p className="h3 m-4">Assess, share and improve now</p>
          <Link to={'/signup'} className="btn btn-primary btn-lg btn-primary-inverse m-2">Sign up free</Link>
          <Link to={'/login'} className="btn btn-secondary btn-lg btn-secondary-inverse m-2">Log in</Link>
        </main>
      </div>
  )
}

export default landingPage
