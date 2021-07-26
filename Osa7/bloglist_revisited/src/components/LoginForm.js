import React, { useState } from "react";
import { userLogin } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(userLogin(username, password));
  };

  return (
    <div className="container">
      <h2>Blog app login</h2>
      <form onSubmit={handleLogin}>
        <Form.Group size="sm">
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            autoComplete="on"
            //fixes notification
          />
          <Button
            variant="outline-primary"
            size="sm"
            id="login-button"
            type="submit"
          >
            login
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default LoginForm;
