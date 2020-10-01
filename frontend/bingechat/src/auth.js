import React, { useEffect } from 'react';
import { auth } from './redux/actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (Red, reload) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(async response => {
                if (!response.payload.isAuth) {
                    if (reload) {
                        props.history.push('/login')
                    }
                } else {
                    if (reload === false) {
                        props.history.push('/')
                    }
                }
            })

        }, [dispatch, props.history])

        return (
            <Red {...props} user={user} />
        )
    }
    return AuthenticationCheck;
}


