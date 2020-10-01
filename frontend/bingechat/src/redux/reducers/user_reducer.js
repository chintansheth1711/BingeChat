export default function (state = {}, action) {
    switch (action.type) {
        case 'register_user':
            return { ...state, register: action.payload }
        case 'login_user':
            return { ...state, success: action.payload }
        case 'auth_user':
            return { ...state, userData: action.payload }
        case 'logout_user':
            localStorage.removeItem("token")
            return { ...state }
        default:
            return state;
    }
}