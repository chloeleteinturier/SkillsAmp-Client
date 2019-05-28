import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

import ChartsPage from './../components/PolarChart'

import userService from './../lib/users-service';
import growthModelService from './../lib//growthModel-service';
import Navbar from './../components/Navbar'


class Profile extends Component {

  constructor(props){
    super(props);
    this.state={
      user: {},
      growthModel: {},
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
            })
        }
      })  
    console.log(this.state.user)
  }


  render() {
    const { user, growthModel} = this.state
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    console.log('user', user)
    console.log('growthModel', growthModel)
    console.log('user.team', user.team)


    // const data = {
    //   labels: [
    //     'Red',
    //     'Green',
    //     'Yellow'
    //   ],
    //   datasets: [{
    //     data: [150, 30, 245],
    //     backgroundColor: [
    //     '#FF6384',
    //     '#36A2EB',
    //     '#FFCE56'
    //     ],
    //     hoverBackgroundColor: [
    //     '#FF6384',
    //     '#36A2EB',
    //     '#FFCE56'
    //     ]
    //   }]
    // };

    const data=[
      2.2,
      3.1,
      1,
      1.8,
      3.1,
      0.5,
      2.8,
      2,
    ]

    const labels = [
      'Javasctip',
      'Node.js',
      'Express.js',
      'HTML',
      'CSS',
      'React',
      'Communication',
      'Emphaty',
    ]


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

          <ChartsPage data={data} labels={labels} />


        </div>

          </div>

      </div>
    )
  }
}

export default withAuth(Profile);