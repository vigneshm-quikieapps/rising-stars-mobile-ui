import * as action from '../action-types';

export const getmemberData = token => {
  console.log('token for members data in sagas', token);
  return {
    type: action.USER_GET_MEMBER,
    payload: token,
  };
};

export const getmemberClass = id => {
  return {
    type: action.USER_GET_MEMBER_CLASS_DATA,
    payload: id,
  };
};

export const getClasses = id => {
  return {
    type: action.USER_GET_CLASSES,
    payload: id,
  };
};
