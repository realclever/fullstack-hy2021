import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 15,
    width: "50%",
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div style={blogStyle} className="visible">
      <div>
        <b>
          {blog.title} - {blog.author}
        </b>
      </div>
      <div style={hideWhenVisible}>
        <button id="view" onClick={() => setVisible(true)}>
          view
        </button>
      </div>

      <div style={showWhenVisible} className="hidden">
        <button onClick={() => setVisible(false)}>hide</button>
        <div>url: {blog.url} </div>
        <div>
          likes: {blog.likes}
          <button id="like" onClick={() => handleLike(blog)}>
            like
          </button>
        </div>
        <div>added by: {blog.user.username} </div>
        {blog.user.username === user.username ? (
          <button id="remove" onClick={() => handleRemove(blog)}>
            remove
          </button>
        ) : (
          <></>
        )}
      </div>
    </div> //ends
  );
};

export default Blog;
