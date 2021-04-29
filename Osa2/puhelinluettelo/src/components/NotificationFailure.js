import React from "react";

const NotificationFailure = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="failure">{message}</div>;
};

export default NotificationFailure;
