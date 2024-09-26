
import React from 'react';

function StatusItem({ color, status, currentStatus, text, isFirst }) {
  return (
    <div className={`status-item ${currentStatus >= status ? color : "gray"}`}>
      {isFirst && <div className="status-circle"></div>}
      <div className="status-line"></div>
      <div className="status-circle"></div>
      <div className={`status-description ${currentStatus >= status ? color : "gray"}`}>{text}</div>
    </div>
  );
}

function StatusBar({ status }) {
  const statusItems = [
    { color: "blue", text: "Swap out", status: 1 },
    // { color: "pink", text: "Swap out", status: 2 },
    { color: "orange", text: "Swap out", status: 2 },
  ];

  return (
    <div className="status-bar">
      {statusItems.map((item, index) => (
        <StatusItem
          key={item.status}
          color={item.color}
          status={item.status}
          currentStatus={status}
          text={item.text}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}

export default StatusBar;