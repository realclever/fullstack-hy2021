import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

export const setUser = (user) => {
  window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
  return {
    type: "LOGIN",
    data: user,
  };
};

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const userlog = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(userlog));
      blogService.setToken(userlog.token);
      dispatch(setNotification("Successful login!", 5));
      dispatch({
        type: "LOGIN",
        data: userlog,
      });
    } catch (exception) {
      console.log("Wrong username/password");
      dispatch(setNotification("Wrong username/password", 5));
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem("loggedNoteappUser");
      window.location.href = "/";
      console.log("logged out");
      //dispatch(setNotification("Logged out", 5));
      dispatch({
        type: "LOG_OUT",
        data: null,
      });
    } catch (exception) {
      console.log("Something went wrong");
      //dispatch(setNotification("Something went wrong", 5));
    }
  };
};

const userReducer = (state = null, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};

export default userReducer;
