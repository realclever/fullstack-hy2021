import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    color: "green",
  };
  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);
