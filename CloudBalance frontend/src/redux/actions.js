import { SIDEBAR_TOGGLE, USER_DATA } from "./actionType"

export function sidebarToggle(){
    return{
        type:SIDEBAR_TOGGLE,
    }
}

export function userData(user){
    return{
        type : USER_DATA,
        value : user,
    }
}