import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const token = localStorage.getItem("token");
  const logout = () => {
    axios.get(`${USER_SERVER}/logout`, {
      headers: {
        auth: token
      }
    }).then(response => {
      if (response.status === 200) {
        localStorage.removeItem("token")
        props.history.push("/login");
      } else {
        alert('Logging Out Failed')
      }
    });
  };
  if (!token && user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else if (token && user.userData) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logout}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
  else {
    return (<></>)
  }
}

export default withRouter(RightMenu);

