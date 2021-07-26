import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 10,
  };
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => a.id === id);

  return (
    <div>
      <h3>
        {anecdote.content} by {anecdote.author}
      </h3>
      <p> has {anecdote.votes} votes </p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{" "}
    for the source code.
  </div>
  //example website
);

const CreateNew = (anecdote) => {
  const history = useHistory();
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    anecdote.addNew({
      content: content.aneInfo.value,
      author: author.aneInfo.value,
      info: info.aneInfo.value,
      votes: 0,
    });
    anecdote.setNotification(
      `a new anecdote "${content.aneInfo.value}" was created!`
    );
    console.log("added" + content.aneInfo.value);

    setTimeout(() => {
      anecdote.setNotification("");
    }, 10000);
    history.push("/");
  };

  const handleResetFields = (e) => {
    e.preventDefault();
    content.resetFields();
    author.resetFields();
    info.resetFields();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.aneInfo} />
        </div>
        <div>
          author
          <input {...author.aneInfo} />
        </div>
        <div>
          url for more info
          <input {...info.aneInfo} />
        </div>
        <br></br>
        <button>create</button>
        <button type="reset" onClick={handleResetFields}>
          reset
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <div>
          <Menu />
        </div>{" "}
        <br></br>
        <b>{notification}</b>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} setNotification={setNotification} />
          </Route>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
        <div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}; //app end

export default App;
