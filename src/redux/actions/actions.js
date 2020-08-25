import {LOGIN, ME} from './../types/types'

import authService from './../../lib/auth-service';


export const me = (newstate) => {
    return { type: ME, payload: newstate }
  }


export const login = (body) => {
    return { type: LOGIN, payload: body }
}
