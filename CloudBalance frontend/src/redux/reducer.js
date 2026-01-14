import { SIDEBAR_TOGGLE, USER_DATA, DELETE_USER } from "./actionType.js"

const initialValues = {
    open: true,
    user : {}
}

export const toggleReducer = (state = initialValues, action) => {

    switch(action.type){
        case SIDEBAR_TOGGLE : 
        return {
            ...state,
            open : !state.open
        }
        case USER_DATA : 
        return{
            ...state,
            user: action.value,
        }
        case DELETE_USER :
            return{
                ...state,
                user: null,
            }
        default:
            return state;
    }
}