
const initialValues = {
    open: true
}

export const toggleReducer = (state = initialValues, action) => {
    if (action.type == 'SIDEBARTOGGLE') {
        return {
            ...state,
            open: !state.open
        }
    }
    else {
        return state
    }
}