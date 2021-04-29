import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import NotificationSuccess from "./components/NotificationSuccess";
import "./index.css";
import NotificationFailure from "./components/NotificationFailure";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setNewSuccessMessage] = useState("");
  const [failureMessage, setNewFailureMessage] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      console.log("current set of names", initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  //became a mess and couldn't get it to work as part of a component.
  const removePerson = (id) => {
    //little helper
    const findToBeDeleted = {
      ...persons.find((p) => p.id === id),
    };
    if (window.confirm(`Delete '${findToBeDeleted.name}'?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNewSuccessMessage(`Removed ${findToBeDeleted.name} from contacts`);
          setTimeout(() => {
            setNewSuccessMessage(null);
          }, 3000);
          console.log(`Removed ${findToBeDeleted.name}`);
        })
        //now the app won't crash if the user tries to remove already removed contant
        .catch((error) => {
          console.log("something very strange just happened", error);
          setNewFailureMessage(
            `Information of ${findToBeDeleted.name} has already been removed from server`
          );
          setTimeout(() => {
            setNewFailureMessage(null);
          }, 3000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <NotificationSuccess message={successMessage} />
      <NotificationFailure message={failureMessage} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        setNewSuccessMessage={setNewSuccessMessage}
        setNewFailureMessage={setNewFailureMessage}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        removePerson={removePerson}
      />
    </>
  );
};

export default App;
