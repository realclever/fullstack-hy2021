import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NotificationFailure from "./components/NotificationFailure";
import NotificationSuccess from "./components/NotificationSuccess";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import "./index.css";
import Footer from "./components/Footer";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessage, setNewSuccessMessage] = useState("");
  const [failureMessage, setNewFailureMessage] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      console.log("successful login");
      setNewSuccessMessage("Successful login!");
      setTimeout(() => {
        setNewSuccessMessage(null);
      }, 1000);
    } catch (exception) {
      console.log("Wrong username/password");
      setNewFailureMessage("Wrong username/password");
      setTimeout(() => {
        setNewFailureMessage(null);
      }, 3000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedNoteappUser");
    window.location.href = "/";
    console.log("logged out");
  };

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      blogFormRef.current.toggleVisibility();
      console.log("successfully added blog");
      setNewSuccessMessage(
        `New blog ${newBlog.title} by ${newBlog.author} was added`
      );
      setTimeout(() => {
        setNewSuccessMessage(null);
      }, 3000);
    } catch (exception) {
      console.log("Something went wrong");
      setNewFailureMessage("Something went wrong");
      setTimeout(() => {
        setNewFailureMessage(null);
      }, 3000);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const loginForm = () => <LoginForm createLogin={handleLogin} />;

  const handleLike = async (blogObject) => {
    try {
      const liked = { ...blogObject, likes: (blogObject.likes += 1) };
      await blogService.like(blogObject.id, liked);
      console.log("+1");
      setNewSuccessMessage(`+1`);
      setTimeout(() => {
        setNewSuccessMessage(null);
      }, 300);
    } catch (exception) {
      console.log("+0");
      setNewFailureMessage("+0");
      setTimeout(() => {
        setNewFailureMessage(null);
      }, 3000);
    }
  };

  const handleRemove = async (blogObject) => {
    if (
      window.confirm(
        `Remove blog ${blogObject.title} by ${blogObject.author} ?`
      )
    ) {
      try {
        await blogService.remove(blogObject.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        console.log("removed");
        setNewSuccessMessage(`Blog removed successfully`);
        setTimeout(() => {
          setNewSuccessMessage(null);
        }, 3000);
      } catch (exception) {
        console.log("not removed");
        setNewFailureMessage("not removed");
        setTimeout(() => {
          setNewFailureMessage(null);
        }, 3000);
      }
    }
  };

  const showBlogs = () => (
    <div>
      {blogForm()}
      <h2>Blogs list</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes) // for descending sort
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
    </div>
  );

  return (
    <>
      <h1> Blog app</h1>
      <NotificationSuccess message={successMessage} />
      <NotificationFailure message={failureMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <>
          <p>
            logged in as {user.name}
            <button onClick={handleLogout}>log out</button>
          </p>
          {showBlogs()}
        </>
      )}
      <Footer />
    </>
  );
}; //app ends
export default App;
