import React from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./auth";
import Home from "./components/Home/Home";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Chat from "./components/Chat/Chat"
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="content_wrapper" style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/chat" component={Auth(Chat, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/createRoom" component={Auth(CreateRoom, null)} />
        </Switch>
      </div>
    </>
  );
}

export default App;
