import * as Action from '../action-types';

const childState = {
  addchild: '',
  clubdata: '',
  classdata: '',
  slotdata: '',
};
export const childData = (state = childState, action) => {
  switch (action.type) {
    case Action.USER_ADD_CHILD_SUCCEDED:
      return {
        ...state,
        addchild: action.payload,
      };
    case Action.USER_ADDCLUB:
      return {
        ...state,
        clubdata: action.payload,
      };
    case Action.USER_ADDCLASS:
      return {
        ...state,
        classdata: action.payload,
      };
    case Action.USER_ADDSLOT:
      return {
        ...state,
        slotdata: action.payload,
      };
    default:
      return state;
  }
};

const clubstate = {
  clubData: [],
};

export const clubname = (state = clubstate, action) => {
  switch (action.type) {
    case Action.USER_GET_CLUB_SUCCESS:
      return {
        ...state,
        clubData: action.payload.docs,
      };
    default:
      return state;
  }
};

const classtate = {
  classtate: [],
  error: '',
};

export const classname = (state = classtate, action) => {
  switch (action.type) {
    case Action.USER_GET_CLASS_SUCCESS:
      return {
        ...state,
        classtate: action.payload.docs,
      };
    case Action.USER_GET_CLASS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const sessionState = {
  sessiondata: [],
  error: '',
};

export const sessionlist = (state = sessionState, action) => {
  switch (action.type) {
    case Action.USER_GET_SESSION_SUCCESS:
      return {
        ...state,
        sessiondata: action.payload.docs,
      };
    case Action.USER_GET_SESSION_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

const clubfinancestate = {
  financedata: '',
  error: '',
};

export const clubfinance = (state = clubfinancestate, action) => {
  switch (action.type) {
    case Action.USER_GET_CLUB_FINANCE_SUCCESS:
      return {
        ...state,
        financedata: action.payload,
      };
    case Action.USER_GET_CLUB_FINANCE_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

const additionalState = {
  additionalData: '',
  error: '',
};

export const addAdditionaldata = (state = additionalState, action) => {
  switch (action.type) {
    case Action.USER_SET_ADDITION:
      return {
        ...state,
        additionalData: action.payload,
      };
    default:
      return state;
  }
};

const provideState = {
  allergie: '',
  condition: '',
  photographConsent: '',
  signedByParent: '',
};

export const addProvidedata = (state = provideState, action) => {
  switch (action.type) {
    case Action.USER_SET_PROVIDE_CONSENT:
      return {
        ...state,
        allergies: action.allergie,
        condition: action.condition,
        photograhConsent: action.photo,
        signedbyParent: action.sign,
      };
    default:
      return state;
  }
};
const enrolledChild = {
  enrollstate: '',
  error: '',
};

export const enrollChild = (state = enrolledChild, action) => {
  switch (action.type) {
    case Action.USER_ENROLL_CHILD_SUCCEDED:
      return {
        ...state,
        enrollstate: action.payload,
      };
    case Action.USER_ENROLL_CHILD_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
