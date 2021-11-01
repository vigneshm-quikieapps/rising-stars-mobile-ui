import {
  GET_USER_PROGRESS_FAILED,
  GET_USER_PROGRESS_SUCCESS,
} from '../actiontype';

const INITIAL_STATE = {
  progress: [],
  error: [],
};

export function ProgReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_PROGRESS_SUCCESS:
      return {...state, progress: action.payload};
    case GET_USER_PROGRESS_FAILED:
      return {...state, error: action.payload};
    default:
      return state;
  }
}
