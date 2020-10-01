import React from "react";
import { Comment, Tooltip, Avatar } from 'antd';

function Message(props) {
    let d = new Date(props.time)
    let datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes();
    return (
        <div style={{ width: '100%' }}>
            <Comment
                author={props.sender.fname + ' ' + props.sender.lname}
                avatar={
                    <Avatar
                        src={props.sender.image} alt={props.sender.name}
                    />
                }
                content={
                    props.type === "media" ?
                        props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                            < video
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:3005/${props.message}`} alt="video"
                                type="video/mp4" controls
                            />
                            :
                            <img
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:3005/${props.message}`}
                                alt="img"
                            />
                        :
                        <p>
                            {props.message}
                        </p>
                }
                datetime={
                    <Tooltip title={datestring}>
                        <span>{datestring}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default Message;

