import { SIDEBAR_TOGGLE, USER_DATA } from "./actionType"

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
        default:
            return state;
    }

    // if (action.type == SIDEBAR_TOGGLE) {
    //     return {
    //         ...state,
    //         open: !state.open
    //     }
    // }
    // else {
    //     return state
    // }
}

// export const userReducer = (state = )