import axios from 'axios';
import { CHAT_SERVER } from '../../config.js';

export function getChats(data) {
    const request = axios.post(`${CHAT_SERVER}/getChats`, { data: data }, {
        headers: {
            auth: localStorage.getItem("token")
        }
    }).then(response => response.data);

    return {
        type: 'get_chats',
        payload: request
    }
}

export function afterPostMessage(data) {

    return {
        type: 'after_post_message',
        payload: data
    }
}

