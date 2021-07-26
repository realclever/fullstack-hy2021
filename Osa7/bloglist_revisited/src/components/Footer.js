import React from "react";

const Footer = () => {
  const footerStyle = {
    color: "grey",
    fontStyle: "italic",
    fontSize: 13,
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>Department of Computer Science, University of Helsinki 2021</em>
    </div>
  );
};

export default Footer;
