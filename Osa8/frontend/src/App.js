import React, { useState, useEffect } from "react";
import { useApolloClient, useSubscription, useLazyQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import BirthEdit from "./components/BirthEdit";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED, ALL_BOOKS, LOGGED_USER } from "./queries";
//import "bootstrap/dist/css/bootstrap.min.css";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div style={{ color: "red", fontFamily: "Arial", fontSize: "20px" }}>
      {errorMessage}
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState("");

  const client = useApolloClient();

  const [loggedUser, result] = useLazyQuery(LOGGED_USER, {
    pollInterval: 1000,
  });

  useEffect(() => {
    if (result.data) {
      setUser(result.data.me);
    }
  }, [result, user]);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    return !token ? null : setToken(token);
  }, []);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("user-token", token);
    console.log(`Token aquired:" ${token} `);
    setPage("authors");
    loggedUser();
    notify("logged in");
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
    notify("logged out");
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} was just added to the library!`);
      updateCacheWith(addedBook);
      console.log(subscriptionData);
    },
  });

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <button
            onClick={() => {
              loggedUser();
              setPage("rec");
            }}
          >
            recommendations
          </button>
        )}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        <button onClick={() => setPage("edit")}>edit birthyear</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={notify} setPage={setPage} />
      {user && (
        <Recommendations show={page === "rec"} setError={notify} user={user} />
      )}
      <BirthEdit show={page === "edit"} setError={notify} setPage={setPage} />
      <LoginForm show={page === "login"} setError={notify} setToken={login} />
    </div>
  );
}; //end

export default App;
