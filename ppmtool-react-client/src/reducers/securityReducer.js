import { SET_CURRENT_USER, GET_CURRENT_USER } from '../actions/types';

const initialState = {
  user: {},
  validToken: false
}

const payloadValidator = (payload) => {
  console.log(payload)
  if(payload){
    return true;
  } else {
    return false;
  }
}

export default function(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      return {...state, validToken: payloadValidator(action.payload), user:action.payload };
    case GET_CURRENT_USER:
      return {...state, user:action.payload };
    default:
      return state;
  }
}