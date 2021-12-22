import * as action from '../action-types';

export const setChildData = params => {
  return {
    type: action.USER_ADD_CHILD,
    payload: params,
  };
};

export const setClubData = value => {
  return {
    type: action.USER_ADDCLUB,
    payload: value,
  };
};

export const setClassData = value => {
  return {
    type: action.USER_ADDCLASS,
    payload: value,
  };
};

export const setSlotData = value => {
  return {
    type: action.USER_ADDSLOT,
    payload: value,
  };
};

export const uploadedChildData = () => {
  return {
    type: action.USER_ADDCHILD_SUCCESS,
  };
};
export const enrollChildData = value => {
  return {
    type: action.USER_ENROLL_CHILD,
    payload: value,
  };
};

export const errorchildData = () => {
  return {
    type: action.USER_ADDCHILD_FAILED,
  };
};

export const getClubdata = params => {
  return {
    type: action.USER_GET_CLUB_NAME,
    payload: params,
  };
};

export const getClassdata = data => {
  return {
    type: action.USER_GET_CLASS_NAME,
    payload: data,
  };
};

export const postProvide = id => {
  return {
    type: action.USER_POST_CONSENT,
    payload: id,
  };
};

export const getSessiondata = id => {
  return {
    type: action.USER_GET_SESSION_LIST,
    payload: id,
  };
};

export const clubfinance = id => {
  return {
    type: action.USER_GET_CLUB_FINANCE,
    payload: id,
  };
};

export const setProvide = (allergie, condition, photo, sign) => {
  return {
    type: action.USER_SET_PROVIDE_CONSENT,
    allergie: allergie,
    condition: condition,
    photo: photo,
    sign: sign,
  };
};

export const setAdditionDetails = value => {
  console.log('inside action');
  return {
    type: action.USER_SET_ADDITION,
    payload: value,
  };
};
