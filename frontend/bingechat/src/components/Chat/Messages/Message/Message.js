import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message, name }) => {
  let current = false;
  let tname = message.sender.fname + message.sender.lname;
  if (name === tname) {
    current = true;
    tname = "You"
  }
  tname = message.sender.fname + " " + message.sender.lname;
  let content = message.type === "media" ?
    message.message.substring(message.message.length - 3, message.message.length) === 'mp4' ?
      <video
        style={{ maxWidth: '200px' }}
        src={`http://localhost:3005/${message.message}`} alt="video"
        type="video/mp4" controls
      />
      :
      <img
        style={{ maxWidth: '200px' }}
        src={`http://localhost:3005/${message.message}`}
        alt="img"
      />
    :
    <>
      {ReactEmoji.emojify(message.message)}
    </>
  let d = new Date(message.time)
  let datestring = d.getDate() + "/" + (d.getMonth() + 1) + " " +
    d.getHours() + ":" + d.getMinutes();
  return (
    current
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10"></p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{content}</p>
            <p className="timeText colorWhite justifyEnd">{datestring}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{content}</p>
            <p className="timeText colorDark justifyEnd">{datestring}</p>
          </div>
          <p className="sentText pl-10 ">{tname}</p>
        </div>
      )
  );
}

export default Message;