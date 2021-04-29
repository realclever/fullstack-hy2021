import React from "react";

const Person = ({ persons, removePerson }) => {
  return (
    <>
      <li>
        {persons.name} {persons.number} <span>&nbsp;</span>
        <button onClick={() => removePerson(persons.id)}>remove</button>
      </li>
    </>
  );
};

export default Person;
