import React from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import { userLogin } from "../reducers/loginReducer";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (loginObject) => {
    try {
      dispatch(userLogin(loginObject));
    } catch (exception) {
      console.log("Wrong username/password");
    }
  };

  const loginForm = () => <LoginForm createLogin={handleLogin} />;

  return loginForm();
};

export default Login;
