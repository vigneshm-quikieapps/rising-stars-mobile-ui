import * as action from '../actiontype'

export const loginUserData = (data) => {
  
    return{
        type: action.USER_LOGIN,
        payload:{data}
    }
}