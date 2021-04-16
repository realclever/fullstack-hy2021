import React, { useState } from "react";

// title component
const Title = ({ title }) => {
  return <h2> {title}</h2>;
};

// button component
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  // new votes array filled with zeros
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostvotes, setMostVotes] = useState(0);

  const nextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteAnecdote = () => {
    const vote = [...votes];
    vote[selected] += 1;
    setVotes(vote);
    if (votes[selected] >= votes[mostvotes]) {
      setMostVotes(selected);
    }
  };

  //little helper to display the votes
  const anecdoteVotes = () => {
    if (votes[selected] === 0) {
      return (
        <>
          <p> No votes yet </p>
        </>
      );
    } else {
      return (
        <>
          <p> has {votes[selected]} votes. </p>
        </>
      );
    }
  };

  //little helper to display the most voted anecdote and it's votes
  const anecdoteMostVotes = () => {
    if (votes[mostvotes] === 0) {
      return (
        <>
          <p> No votes yet </p>
        </>
      );
    } else {
      return (
        <>
          {anecdotes[mostvotes]}
          <p> has {votes[mostvotes]} votes. </p>
        </>
      );
    }
  };

  return (
    <>
      <Title title="Anecdote of the day" />
      {anecdotes[selected]} <br></br>
      <br></br>
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={nextAnecdote} text="Next anecdote" />
      {anecdoteVotes()}
      <Title title="Anecdote with most votes" />
      {anecdoteMostVotes()}
    </>
  );
};

export default App;
