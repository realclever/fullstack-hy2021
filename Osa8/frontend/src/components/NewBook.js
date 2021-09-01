import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const NewBook = ({ setPage, ...props }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });
  //refreshes books list when adding a new book
  //refreshes authors when adding a new book

  if (!props.show) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    createBook({ variables: { title, author, published, genres } });
    console.log("a new book was just added...");
    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
    setGenre("");
    //setPage("books");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </div>
        <div>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))} //error fix
            placeholder="published"
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            placeholder="genre"
          />
          <button onClick={addGenre} type="button">
            add
          </button>
        </div>
        <p>selected genres: {genres.join(" ")}</p>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
