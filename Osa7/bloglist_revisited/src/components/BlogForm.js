import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const newBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="d-grid gap-2">
      <h3>Create new a blog</h3>
      <form onSubmit={newBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
          <Button variant="outline-primary" size="sm" id="create" type="submit">
            create
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

//only one prop: createBlog

export default BlogForm;
