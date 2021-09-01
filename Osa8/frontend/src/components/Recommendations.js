import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, LOGGED_USER } from "../queries";

const Recommendations = ({ user, ...props }) => {
  const [books, setBooks] = useState([]);

  const [allBooks, result] = useLazyQuery(ALL_BOOKS, {
    pollInterval: 1000,
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  const users = useQuery(LOGGED_USER);

  useEffect(() => {
    if (users.data) {
      allBooks({ variables: { genre: user.favoriteGenre } });
    }
  }, [result.data]); // eslint-disable-line

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]); // eslint-disable-line

  if (result.loading) return <div>..wait..loading...</div>;

  if (!props.show) return null;

  return (
    <div>
      <h2>Recommendations ({books.length})</h2>
      <div>
        <em>
          in your favorite genre <strong>{user.favoriteGenre}</strong>
        </em>
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
          {books.map((b) => (
            <tr key={b.title}>
              <td> {b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join(", ")} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
