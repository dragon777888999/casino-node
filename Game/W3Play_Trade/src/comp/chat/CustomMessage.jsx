import React from "react";
import { Avatar, MessageTimestamp, MessageText, useMessageContext } from "stream-chat-react";

export default function CustomMessage() {
  const { message } = useMessageContext();

  return (
    <div className="chat-message-container" style={{ position: 'relative', minHeight: '3.5em' }}>
      <div /*className="meassage-avatar"*/ style={{ position: 'absolute', top: 0, left: '.6em', minHeight: '3.5em', height: '100%', width: '10%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <img src={message?.user?.image} style={{ height: '1.95em', width: '1.95em', borderRadius: '50%', marginTop: '.9em', border: '.15em solid #f4c56f80' }} />
        {/* <Avatar image={message.user?.image} size={30} shape="rounded" /> */}
      </div>
      <div className='chat-message-message-content' style={{  marginLeft: '2.5em', height: '100%' }}>
        <MessageText />
        <MessageTimestamp customClass="message-time-stamp" />
      </div>
    </div>
  );
}