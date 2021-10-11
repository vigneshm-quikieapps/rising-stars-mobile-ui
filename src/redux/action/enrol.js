import * as action from '../actiontype'

export const setChildData = (values) =>{
    return{
        type:action.USER_ADDCHILD,
        payload:values
    }
}

export const uploadedChildData = ()=>{
    return{
        type:action.USER_ADDCHILD_SUCCESS
    }
}

export const errorchildData = () => {
    return{
        type:action.USER_ADDCHILD_FAILD
    }
}