import React from "react";

export default function StatusMessage(props) {
    return (
      <div className="chat_container">
        <div className="status-message-container">{props.message}</div>
      </div>
    );
  }