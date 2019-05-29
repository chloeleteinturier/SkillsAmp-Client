import axios from 'axios';

class FinalCompassService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: false // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  getAll =() => {
    return this.auth.get(`/final-compass`)
    .then((data) => data )
  }

  getOne =(id) =>{
    return this.auth.get(`/final-compass/${id}`)
    .then((data)=> data.data )
  }

  updateOne = (id, finalCompass ) =>{
    return this.auth.put(`/final-compass/${id}`, finalCompass)
    .then((data)=> data )
  }

  createFinalCompass(evaluated, growthCompass, team){
    return this.auth.post('/final-compass', {evaluated, growthCompass, team})
      .then(({ data }) => data);
  }
}

const finalCompassService = new FinalCompassService();

export default finalCompassService;
