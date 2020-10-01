import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Typography } from 'antd';
import { useDispatch } from "react-redux";
import { createRoom } from "../../redux/actions/user_actions";

const { Title } = Typography;


function CreateRoom(props) {
    const dispatch = useDispatch();
    const [room, setRoom] = useState('');
    const [formErrorMessage, setFormErrorMessage] = useState('')
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
                    console.log(values);
                    let data = {
                        name: values.room
                    };

                    dispatch(createRoom(data))
                        .then(async response => {
                            if (response.payload.success) {
                                localStorage.setItem("room", JSON.stringify(response.payload.room))
                                props.history.push("/chat");
                            } else {
                                // alert("Room already exists");
                                setFormErrorMessage(response.payload.message)
                            }
                        })
                        .catch(err => {
                            // alert("Room" + response.payload.room.name + "already exists");
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

                        <Title level={2}>Create New Room</Title>
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
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onClick={handleSubmit}>
                                        Create Room
                                    </Button>
                                </div>
                                 Or <a href="/">Join a room</a>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default withRouter(CreateRoom);

