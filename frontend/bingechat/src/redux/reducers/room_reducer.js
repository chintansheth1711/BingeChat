export default function (state = {}, action) {
    switch (action.type) {
        case 'join_room':
            return { ...state, room: action.payload }
        case 'create_room':
            return { ...state, room: action.payload }
        default:
            return state;
    }
}