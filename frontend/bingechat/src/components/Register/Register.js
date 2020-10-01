import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { register } from "../../redux/actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Register(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: '',
        fname: '',
        lname: '',
        password: '',
        conPass: ''
      }}
      validationSchema={Yup.object().shape({
        fname: Yup.string()
          .required('First Name is required'),
        lname: Yup.string()
          .required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        conPass: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let data = {
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            password: values.password,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(register(data)).then(res => {
            if (res.payload.success) {
              props.history.push("/login");
            } else {
              alert(res.payload.message)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors

        } = props;
        return (
          <div className="app">
            <h2>Sign up</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="Name">
                <Input
                  id="fname"
                  placeholder="Enter your first name"
                  type="text"
                  value={values.fname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.fname && touched.fname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.fname && touched.fname && (
                  <div className="input-feedback">{errors.fname}</div>
                )}
              </Form.Item>

              <Form.Item required label="Last Name">
                <Input
                  id="lname"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lname && touched.lname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.lname && touched.lname && (
                  <div className="input-feedback">{errors.lname}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="conPass"
                  placeholder="Enter your conPass"
                  type="password"
                  value={values.conPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.conPass && touched.conPass ? 'text-input error' : 'text-input'
                  }
                />
                {errors.conPass && touched.conPass && (
                  <div className="input-feedback">{errors.conPass}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
