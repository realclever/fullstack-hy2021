import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import blogService from "./services/blogs";
import { setUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import BlogsList from "./components/BlogsList";
import User from "./components/User";
import Users from "./components/Users";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Navi from "./components/Navi";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  if (user) {
    return (
      <div className="container-sm p-3 my-3 border">
        <div>
          <Navi />
        </div>
        <div>
          <br></br>
          <h2> Blog app </h2>
          <Notification />
          <br></br>
          <div>
            <Switch>
              <Route path="/blogs/:id">
                <Blog />
              </Route>
              <Route path="/users/:id">
                <User />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <CreateBlog />
                <BlogsList />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  return (
    <div className="container p-3 my-3 border">
      <Notification />
      <Login />
    </div>
  );
}; //app ends
export default App;
