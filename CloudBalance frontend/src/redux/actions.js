import { SIDEBAR_TOGGLE, USER_DATA , DELETE_USER} from "./actionType.js"

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

export function deleteUser(){
    return{
        type : DELETE_USER,
    }
}