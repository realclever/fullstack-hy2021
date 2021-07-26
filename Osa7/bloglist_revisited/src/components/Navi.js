import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/loginReducer";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Nav, Navbar } from "react-bootstrap";

const Navi = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const padding = {
    padding: 7,
  };

  const handleLogout = async (loginObject) => {
    try {
      dispatch(userLogout(loginObject));
      console.log("logged out");
    } catch (exception) {
      console.log("Something went wrong");
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" sticky="top">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em>
              signed in as {user.name} &nbsp;
              <Button variant="outline-dark" size="sm" onClick={handleLogout}>
                log out
              </Button>
            </em>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navi;
