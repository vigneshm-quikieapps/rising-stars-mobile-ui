import * as action from '../action-types';

export const setChildData = values => {
  return {
    type: action.USER_ADDCHILD,
    payload: values,
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

export const errorchildData = () => {
  return {
    type: action.USER_ADDCHILD_FAILED,
  };
};

export const getClubdata = () => {
  return {
    type: action.USER_GET_CLUB_NAME,
  };
};

export const getClassdata = id => {
  return {
    type: action.USER_GET_CLASS_NAME,
    payload: id,
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
