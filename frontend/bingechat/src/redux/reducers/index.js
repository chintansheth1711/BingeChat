import { combineReducers } from 'redux';
import user from './user_reducer';
import chat from './chat_reducer';
import room from './room_reducer'
const rootReducer = combineReducers({
    user,
    chat,
    room
});

export default rootReducer;