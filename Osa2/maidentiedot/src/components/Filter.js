import React from "react";

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <>
      <input
        placeholder="Filter shown with"
        value={newFilter}
        onChange={handleFilterChange}
      />
    </>
  );
};

export default Filter;
