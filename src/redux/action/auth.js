import * as Action from '../action-types';

export const PostCode = data => {
  return {
    type: Action.USER_GET_POST_CODE,
    payload: data,
  };
};

export const PostDataPass = (data, size) => {
  return {
    type: Action.USER_POST_CODE_DATA_PASS,
    payload: data,
    size: size,
  };
};

export const loginUserData = data => {
  return {
    type: Action.USER_LOGIN,
    payload: {data},
  };
};

export const RegisterData = data => {
  return {
    type: Action.USER_REGISTER,
    payload: data,
  };
};

export const forgetPasswordData = data => {
  return {
    type: Action.USER_FORGOT_PASSWORD,
    payload: data,
  };
};

export const resetPasswordData = data => {
  return {
    type: Action.USER_RESET_PASSWORD,
    payload: data,
  };
};
