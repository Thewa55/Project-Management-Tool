import axios from 'axios';
import { GET_ERRORS } from './types'

export default createProject = (project) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/projects", project)
  } catch (err) {
    dispatch({
      type: "GET_ERRORS",
      payload: err.response.data
    })
  }
}
