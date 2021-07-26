import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    color: "blue",
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
