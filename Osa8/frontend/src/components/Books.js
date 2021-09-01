import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genreFilter, setgenreFilter] = useState("");

  const books = useQuery(ALL_BOOKS, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  if (books.loading) return <div>..wait..loading...</div>;

  let genresFilter = [];
  books.data.allBooks.map((b) =>
    b.genres.map((g) => {
      genresFilter.push(g);
      return (genresFilter = [...new Set(genresFilter)]); //generates a unique set without duplicates
    })
  );

  if (!props.show) return null;

  const booksFilter = !genreFilter
    ? books.data.allBooks
    : books.data.allBooks.filter((b) => b.genres.includes(genreFilter));

  return (
    <div>
      <h2>Books ({booksFilter.length})</h2>
      <div>
        {genreFilter ? (
          <em>
            in genre <strong>{genreFilter}</strong>
          </em>
        ) : (
          <p></p>
        )}
      </div>
      <br></br>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {booksFilter.map((a) => (
            <tr key={a.title}>
              <td> {a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      {genresFilter.map((s) => (
        <button onClick={() => setgenreFilter(s)} key={s} value={s}>
          {s}
        </button>
      ))}
      <button onClick={() => setgenreFilter("")}>All books</button>
    </div>
  );
};

export default Books;
