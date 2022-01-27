import * as Action from '../action-types';

const memberstate = {
  classesOfLoggedInUser: {},
  memberdata: '',
  sagaerror: '',
  error: '',
  isloading: false,
};

export const memberData = (state = memberstate, action) => {
  switch (action.type) {
    case Action.USER_GET_CLASSES_SUCCESS:
      return {
        ...state,
        classesOfLoggedInUser: action.data.docs,
        error: action.data.message,
        isloading: false,
      };
    case Action.USER_GET_CLASSES_FAILED:
      return {
        ...state,
        sagaerror: action.error,
        isloading: false,
      };
    case Action.USER_GET_MEMBER_SUCCESS:
      return {
        ...state,
        memberData: action.data.docs,
        error: action.data.message,
        isloading: false,
      };
    case Action.USER_GET_MEMBER_FAILED:
      return {
        ...state,
        sagaerror: action.error,
        isloading: false,
      };
    case Action.USER_GET_MEMBER:
      return {
        ...state,
        isloading: true,
      };
    default:
      return state;
  }
};

const memberclassState = {
  error: '',
  sagaerror: '',
  isloading: false,
  classData: '',
};

export const memberClassData = (state = memberclassState, action) => {
  switch (action.type) {
    case Action.USER_GET_MEMBER_CLASS_DATA_SUCCESS:
      return {
        ...state,
        classData: action.data.enrolments,
        isloading: false,
      };
    case Action.USER_GET_MEMBER_CLASS_DATA_FAILED:
      return {
        ...state,
        error: action.error,
        isloading: false,
      };
    case Action.USER_GET_MEMBER_CLASS_DATA:
      return {
        ...state,
        isloading: true,
      };
    default:
      return state;
  }
};

const currentMemberState = {
  data: '',
};

export const currentMemberData = (state = currentMemberState, action) => {
  switch (action.type) {
    case Action.USER_GET_CURRENT_MEMBER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const currentMemberAttendanceState = {
  attendance: '',
};

export const currentMemberAttendance = (
  state = currentMemberAttendanceState,
  action,
) => {
  switch (action.type) {
    case Action.USER_GET_CURRENT_MEMBER_ATTENDANCE:
      return {
        ...state,
        attendance: action.payload,
      };
    default:
      return state;
  }
};

const currentMemberActivityState = {
  activity: '',
  error: '',
};

export const currentMemberActivity = (
  state = currentMemberActivityState,
  action,
) => {
  // console.log('Action: ', action.payload, action.type);
  switch (action.type) {
    case Action.USER_GET_CURRENT_MEMBER_ACTIVITY_SUCCESS:
      return {
        ...state,
        activity: action.data,
      };
    case Action.USER_GET_CURRENT_MEMBER_ACTIVITY_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
