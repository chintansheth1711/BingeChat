import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../redux/actions/chat_actions";
import Message from "./Message";
import Messages from "./Messages/Messages";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./Chat.css";

export class Chat extends Component {
  state = {
    message: "",
  };

  componentDidMount() {
    let server = "http://localhost:3005";
    this.props.dispatch(getChats({ roomId: JSON.parse(localStorage.getItem("room"))._id }));
    this.socket = io(server);

    this.socket.on("Output Message", (msg) => {
      this.props.dispatch(afterPostMessage(msg));
    });
  }

  componentDidUpdate() {
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleSearchChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  // renderCards = () => this.props.chats.chats && this.props.chats.chats.map((chat) => <Message key={chat._id} {...chat} />);

  onDrop = (files) => {
    if (this.props.user.userData && !this.props.user.userData.isAuth) {
      alert("Please Log in first");
    }

    let formData = new FormData();

    formData.append("file", files[0]);

    axios
      .post("http://localhost:3005/chat/uploadFiles", formData, {
        headers: { "content-type": "multipart/form-data", auth: localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.success) {
          let message = response.data.url;
          let id = this.props.user.userData._id;
          let name = this.props.user.userData.name;
          let image = this.props.user.userData.image;
          let time = moment();
          let type = "media";

          this.socket.emit("Input Message", {
            message,
            id,
            name,
            image,
            time,
            type,
            room: JSON.parse(localStorage.getItem("room")),
          });
        }
      });
  };

  submitMessage = (e) => {
    e.preventDefault();
    if (this.props.user.userData && !this.props.user.userData.isAuth) {
      alert("Please Log in first");
      return this.props.history.push("/login");
    }
    let message = this.state.message;
    let id = this.props.user.userData._id;
    let name = this.props.user.userData.name;
    let image = this.props.user.userData.image;
    let time = moment();
    let type = "text";

    this.socket.emit("Input Message", {
      message,
      id,
      name,
      image,
      time,
      type,
      room: JSON.parse(localStorage.getItem("room")),
    });
    this.setState({ message: "" });
  };

  render() {
    let name = JSON.parse(localStorage.getItem("room")).name;
    return (
      <React.Fragment>
        <div>
          <p style={{ fontSize: "2rem", textAlign: "center", fontWeight: "bold", textDecoration: "underline" }}>{name}</p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="infinite-container" style={{ height: "500px", marginBottom: "15px", overflowY: "scroll" }}>
            {/* {this.props.chats && this.renderCards()}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
             */}
            {this.props.chats && <Messages messages={this.props.chats.chats} name={localStorage.getItem("name")} />}
          </div>

          <Row>
            <Form layout="inline" style={{ marginBottom: "50px" }} onSubmit={this.submitmessage}>
              <Col span={18}>
                <Input
                  id="message"
                  prefix={<Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Type a Message"
                  type="text"
                  value={this.state.message}
                  onChange={this.handleSearchChange}
                />
              </Col>
              <Col span={2}>
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button>
                          <Icon type="upload" />
                        </Button>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Col>

              <Col span={4}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.submitMessage}
                  htmlType="submit"
                >
                  <Icon type="enter" />
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chats: state.chat,
    room: state.room,
  };
};

export default connect(mapStateToProps)(Chat);
