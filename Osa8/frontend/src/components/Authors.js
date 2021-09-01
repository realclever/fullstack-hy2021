import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) return <div>..wait..loading...</div>;

  if (!props.show) return null;

  return (
    <div>
      <div>
        <h2>Authors ({authors.data.allAuthors.length})</h2>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div></div>
    </div>
  );
}; //end

export default Authors;
