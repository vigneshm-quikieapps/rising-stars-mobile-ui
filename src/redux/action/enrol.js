import * as action from '../actiontype'

export const setChildData = (values) => {
    return {
        type: action.USER_ADDCHILD,
        payload: values
    }
}

export const uploadedChildData = () => {
    return {
        type: action.USER_ADDCHILD_SUCCESS
    }
}

export const errorchildData = () => {
    return {
        type: action.USER_ADDCHILD_FAILED
    }
}

export const getClubdata = () => {
    return {
        type: action.USER_GET_CLUB_NAME
    }
}

export const getClassdata = (id) => {
   
    return {
        type:action.USER_GET_CLASS_NAME,
        payload:id
    }
}

export const getSessiondata = (id) => {
     console.log('action------------>',id)
    return{
        type:action.USER_GET_SESSION_LIST,
        payload:id
    }
}