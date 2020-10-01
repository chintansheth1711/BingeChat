import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    JOIN_ROOM,
    CREATE_ROOM
} from './types';
import { USER_SERVER } from '../../config.js';
import { ROOM_SERVER } from '../../config.js';

export function register(data) {
    const request = axios.post(`${USER_SERVER}/register`, data)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function login(data) {
    const request = axios.post(`${USER_SERVER}/login`, data)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function joinRoom(data) {
    const request = axios.post(`${ROOM_SERVER}/joinRoom`, data, {
        headers: {
            auth: localStorage.getItem("token")
        }
    })
        .then(response => response.data);

    return {
        type: JOIN_ROOM,
        payload: request
    }
}

export function createRoom(data) {
    const request = axios.post(`${ROOM_SERVER}/createRoom`, data, {
        headers: {
            auth: localStorage.getItem("token")
        }
    })
        .then(response => response.data);

    return {
        type: CREATE_ROOM,
        payload: request
    }
}

export function auth() {
    let token = localStorage.getItem("token") == null ? "" : localStorage.getItem("token")
    const request = axios.get(`${USER_SERVER}/auth`, {
        headers: {
            auth: token
        }
    })
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logout() {
    localStorage.removeItem("token")
    const request = axios.get(`${USER_SERVER}/logout`, {
        headers: {
            auth: localStorage.getItem("token")
        }
    })
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
    }
}

