import * as Action from "../actiontype"

const initialState = {
    payload:'',
    
}
export const childData = (state = initialState,action) =>{
    switch(action.type){
        case Action.USER_ADDCHILD :
            return {
                    ...state,
                    payload:action.payload                    
            }
        default:
            return state    
    }
}