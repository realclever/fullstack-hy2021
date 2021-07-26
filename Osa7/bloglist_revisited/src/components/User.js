import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const User = () => {
  const id = useParams().id;
  console.log(id);
  const user = useSelector((state) => state.users.find((u) => u.id === id)); //user by id (works)
  console.log(user);

  if (user) {
    return (
      <div>
        <ListGroup variant="flush">
          <h3>{user.name}'s blogs</h3>
          <ListGroup.Item action variant="Info">
            {user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
  return null;
};

export default User;
