import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

import PolarChart from './../components/PolarChart'

import userService from './../lib/users-service';
import growthModelService from './../lib//growthModel-service';
import Navbar from './../components/Navbar'


class Profile extends Component {

  constructor(props){
    super(props);
    this.state={
      user: {},
      growthModel: {},
      data:[],
      labels: []
    }
  }

  componentDidMount() {
    //  fetch the data from API befor initial render
    const {user} = this.props
    userService.getOne(user._id)
      .then((oneUser)=>{
        this.setState({ user: oneUser })
        if(oneUser.team){
          growthModelService.getOne(oneUser.team.growthModel)
            .then((oneGrowthModel)=>{
              this.setState({ growthModel: oneGrowthModel});
              if(this.state.user.currentGrowthCompass){
                this.fetchLabels()
                this.fetchAssessedLevelData()
              }
            })
        }
      })  
  }

  fetchLabels = () =>{
    const {user} = this.state
    const labels = user.currentGrowthCompass.growthCompass.indicators.map((oneIndicator)=>{
      return oneIndicator.name
    })
    this.setState({labels})
  }

  fetchAssessedLevelData = () =>{
    const {user} = this.state
    const data = user.currentGrowthCompass.growthCompass.indicators.map((oneIndicator)=>{
      return oneIndicator.assessedLevel
    })
    this.setState({data, readyToMount:true})
  }

  render() {
    const { user, growthModel, labels, data} = this.state
    return (
      <div className="container-fluid content">
        <div className="row">
          <Navbar theUser={user} />
          <div className="col- col-sm- col-md- col-lg-10 col-xl- mainview pt-3 pb-3">
              {
                user.team ?
                <h1 className="h4 text-center mt-4 mb-4">My skills wheel: <strong className="font-weight-bold">{growthModel.name}</strong></h1>                        
                :
                <h5 className='text-center mt-4 mb-4'><Link to='/create-team'>Create a team to start</Link></h5>
              }
              <div className="container container-block">
                {
                  data.length ?
                  <PolarChart data={data} labels={labels} animation={true} displayLabel={true} height={50} />
                  :
                  <div className="container container-block pt-4 mb-4 d-flex flex-wrap others-assessments">
                      <div className="alert alert-warning w-100 text-center" role="alert">
                          You don't have skills wheel yet, you need to do your first skills assessment.
                      </div>                              
                  </div>  

                }
              </div>
        </div>

          </div>

      </div>
    )
  }
}

export default withAuth(Profile);