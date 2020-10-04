import React from 'react';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <>
    {messages && messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
  </>
);

export default Messages;