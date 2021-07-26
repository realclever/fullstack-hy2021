import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const Blogs = () => {
  const blogs = useSelector((state) => state.blog);

  return (
    <div>
      <br></br>
      <h4>Blogs list</h4>
      <ListGroup variant="flush">
        <ListGroup.Item action variant="Info">
          {blogs
            .sort((a, b) => b.likes - a.likes) // for descending sort
            .map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </ListGroup.Item>
            ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Blogs;
