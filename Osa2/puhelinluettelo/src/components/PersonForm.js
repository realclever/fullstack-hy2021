import React from "react";
import personsService from "../services/persons";

const PersonForm = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
  handleNameChange,
  handleNumberChange,
  setNewSuccessMessage,
  setNewFailureMessage,
}) => {
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1,
    };
    if (persons.map((persons) => persons.name).includes(newName)) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with ${newNumber}?`
      );
      updatePerson(persons.filter((p) => p.name === newName)[0].id);
      setNewName("");
      setNewNumber("");
      console.log("number updated:", newName);
    } else {
      personsService.create(personObject).then((result) => {
        setPersons(persons.concat(result));
        setNewName("");
        setNewNumber("");
        setNewSuccessMessage(`Added ${newName} to contacts`);
        setTimeout(() => {
          setNewSuccessMessage(null);
        }, 3000);
        console.log("added new contact", result);
      });
    }
  };

  const updatePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const replacement = { ...person, number: newNumber };

    personsService
      .update(id, replacement)
      .then((result) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : result))
        );
        setNewSuccessMessage(`Updated ${newName}'s number to ${newNumber} `);
        setTimeout(() => {
          setNewSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.log("something very strange just happened", error);
        setNewFailureMessage(
          `Information of ${person.name} has already been removed from server`
        );
        setTimeout(() => {
          setNewFailureMessage(null);
        }, 3000);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  return (
    <>
      <form onSubmit={addPerson}>
        <>
          <h3> add new contact</h3>
          <input
            placeholder="Enter name"
            value={newName}
            onChange={handleNameChange}
          />
        </>
        <>
          <input
            placeholder="Enter number"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default PersonForm;
