import React from "react";
import Person from "./Person";

const Persons = ({ persons, newFilter, showAllPersons, removePerson }) => {
  const personsToShowFilter = showAllPersons
    ? persons
    : persons.filter(
        (persons) =>
          persons.name.toLowerCase().indexOf(newFilter.toLowerCase()) >= 0
      );

  return (
    <>
      <ul className="no-bullets">
        {personsToShowFilter.map((persons) => (
          <Person
            key={persons.name}
            persons={persons}
            removePerson={removePerson}
          />
          //using Person component
        ))}
      </ul>
    </>
  );
};

export default Persons;
