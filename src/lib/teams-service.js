import axios from 'axios';

class TeamsService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: false // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  getOne =(id) =>{
    return this.auth.get(`/team/${id}`)
    .then((data)=> data.data )
  }

  createTeam(team){
    const { name, members, growthModel, checkpoints } = team;
    return this.auth.post('/team', {name, members, growthModel, checkpoints})
      .then(({ data }) => data);
  }

  updateOne = (id, checkpointsId ) =>{
    return this.auth.put(`/team/${id}`, {checkpoints: checkpointsId})
    .then((data)=> data )
  }

}

const teamsService = new TeamsService();

export default teamsService;
