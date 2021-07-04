import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  console.log(createAnecdote);
  console.log(props.createAnecdote);

  const addAne = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnecdote(content);
    props.setNotification(`new anecdote '${content}'`, 5);
  };

  return (
    <div>
      <h3>create new anecdote</h3>
      <form onSubmit={addAne}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

/*
const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (value) => {
      dispatch(createAnecdote(value));
    },
    setNotification: (content) => {
      dispatch(setNotification(`new anecdote '${content}'`, 5));
    },
  };
};
*/

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
