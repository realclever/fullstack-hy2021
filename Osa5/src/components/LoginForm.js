import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    createLogin({
      username: username,
      password: password,
    });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired,
};

//only one prop: createLogin

export default LoginForm;
