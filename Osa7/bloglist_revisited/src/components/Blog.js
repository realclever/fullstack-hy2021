import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBLog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const Blog = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => state.blog.find((b) => b.id === id)); //blog by id (works)
  const history = useHistory();

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog));
      console.log("+1");
      dispatch(setNotification("+1 👍", 5));
    } catch (exception) {
      console.log("+0");
      //dispatch(setNotification("+0", 5));
    }
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        dispatch(removeBLog(blog));
        console.log("removed");
        dispatch(setNotification("Blog removed successfully", 5));
        history.push("/"); //redirect back to main after removal
      } catch (exception) {
        console.log("Something went wrong");
        dispatch(setNotification("Something went wrong", 5));
      }
    }
  };

  if (blog) {
    //cannot read property foo of undefined
    return (
      <div>
        <h4>{blog.title}</h4>
        <p>{blog.author} </p>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          likes: {blog.likes} &nbsp;
          <Button
            id="like"
            variant="outline-primary"
            size="sm"
            onClick={() => handleLike(blog)}
          >
            Like 👍
          </Button>{" "}
        </p>
        <div>
          {blog.user.name === user.name ? (
            <Button
              id="remove"
              variant="outline-primary"
              size="sm"
              onClick={() => handleRemove(blog)}
            >
              Remove 🗑️
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default Blog;
