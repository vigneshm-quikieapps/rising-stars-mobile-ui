import {GET_USER_PROGRESS_SAGA} from '../actiontype';

export const GetUserProgress = id => {
  console.log('GetUserProgress', id);
  return {
    type: GET_USER_PROGRESS_SAGA,
    payload: id,
  };
};
