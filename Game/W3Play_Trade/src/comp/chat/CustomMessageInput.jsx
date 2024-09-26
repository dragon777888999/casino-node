import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

export default function CustomMessageInput() {

  const { handleSubmit } = useMessageInputContext();

  return (
    <div className="message-input-container">
      <div className='str-chat__input-flat str-chat__input-flat--send-button-active'>
        <ChatAutoComplete placeholder='Write Message...' rows={1} />
      </div>
      <div className='message-chat__send-button' onClick={handleSubmit}>
        <img src={`/media/images/sendButton.svg`} style={{ height: '90%' }} />
      </div>
    </div>
  );
};