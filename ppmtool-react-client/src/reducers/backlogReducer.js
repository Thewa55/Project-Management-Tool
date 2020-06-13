import { GET_BACKLOG, DELETE_PROJECT_TASK, GET_PROJECT_TASK} from '../actions/types'

let initialState = {
    projectTasks: [],
    projectTask: {}
  };

export default function(state = initialState, action){
  switch(action.type){
    case GET_BACKLOG:
      return {...state, projectTasks:action.payload };
    case GET_PROJECT_TASK:
      return {...state, projectTask: action.payload};
    case DELETE_PROJECT_TASK:
      return {...state, projectTasks: state.projectTasks.filter(
        project => project.projectIdentifier !== action.payload
      )}
    default:
      return state;
  }
} 