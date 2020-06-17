import { SET_CURRENT_USER } from '../actions/types';
import setJWTToken from './setJWTToken';

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  };