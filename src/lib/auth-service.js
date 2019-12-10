 import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }
  

  imageUpload(file) {
    return this.auth.post('/auth/signup/image', file)
    .then(({data}) => data)
    console.log('hobjk');
  }

  signup(user) {
    const { password, firstName, lastName, email, photoUrl } = user;
    return this.auth.post('/auth/signup', { password, firstName, lastName, email, photoUrl})
      .then(({ data }) => data);
  }

  login(user) {
    const { email, password } = user;
    return this.auth.post('/auth/login', {email, password})
      .then(({ data }) => data)
  }

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(response => response.data)
  }

  me(user) {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }

  checkPassword(body) {
    const {email, password} = body
    return this.auth.post('/auth/checkPassword', {email, password})
    .then( response => response.data )
  }
}

const authService = new AuthService();

export default authService;
