import * as action from '../actiontype'

export const getChildData = (values) =>{
    return{
        type:action.USER_ADDCHILD,
        payload:values
    }
}
