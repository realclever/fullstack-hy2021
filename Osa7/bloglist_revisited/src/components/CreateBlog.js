import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";

const CreateBlog = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject));
      blogFormRef.current.toggleVisibility();
      console.log("successfully added blog");
      dispatch(
        setNotification(
          `New blog ${blogObject.title} by ${blogObject.author} was added`,
          5
        )
      );
    } catch (exception) {
      console.log("Something went wrong");
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  return blogForm();
};

export default CreateBlog;
