import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR_BORNYEAR } from "../queries";

const BirthEdit = ({ setPage, ...props }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const authors = useQuery(ALL_AUTHORS);

  const [changeYear] = useMutation(EDIT_AUTHOR_BORNYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  if (!props.show) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    changeYear({ variables: { name, born } });
    setBorn("");
    props.setError("Edited");
    setPage("authors");
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "30px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };

  return (
    <div>
      <div>
        <h3>Edit birthyear</h3>
        <form onSubmit={handleSubmit}>
          <div>
            name
            <Select
              styles={customStyles}
              defaultValue={name}
              onChange={({ value }) => setName(value)}
              options={authors.data.allAuthors.map((b) => ({
                value: b.name,
                label: b.name,
              }))}
            ></Select>
          </div>
          <div>
            set year
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            ></input>
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
}; //end

export default BirthEdit;
