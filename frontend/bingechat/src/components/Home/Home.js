import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import { joinRoom } from "../../redux/actions/user_actions";

const { Title } = Typography;


function Home(props) {
    if (!localStorage.getItem("token")) props.history.push('/login')
    const dispatch = useDispatch();
    const [room, setRoom] = useState('');
    const [formErrorMessage, setFormErrorMessage] = useState('');
    return (
        <Formik
            initialValues={{
                room
            }}
            validationSchema={Yup.object().shape({
                room: Yup.string()
                    .required('Room Name is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let data = {
                        name: values.room
                    };

                    dispatch(joinRoom(data))
                        .then(response => {
                            if (response.payload.success) {
                                localStorage.setItem("room", JSON.stringify(response.payload.room[0]))
                                props.history.push("/chat");
                            } else {
                                setFormErrorMessage('Room Not Found. Please create new room')
                            }
                        })
                        .catch(err => {
                            setFormErrorMessage('Room not found')
                            setTimeout(() => {
                                setFormErrorMessage("")
                            }, 3000);
                        });
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    isSubmitting
                } = props;
                return (
                    <div className="app">
                        <Title level={2}>Join a Room (Try "Global" if you don't know any)</Title>
                        <form onSubmit={handleSubmit} style={{ width: '350px' }}>

                            <Form.Item required>
                                <Input
                                    id="room"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Enter room name"
                                    type="room"
                                    value={values.room}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.room && touched.room ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.room && touched.room && (
                                    <div className="input-feedback">{errors.room}</div>
                                )}
                            </Form.Item>
                            {formErrorMessage && (
                                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                            )}
                            <Form.Item>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                        Join Room
                                    </Button>
                                </div>
                                Or <a href="/createRoom">Create new room</a>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}
export default withRouter(Home);