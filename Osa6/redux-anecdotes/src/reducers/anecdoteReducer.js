import anecdoteService from "../services/anecdotes";

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newVote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: "VOTE",
      data: newVote,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAne = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANE",
      data: newAne,
    });
  };
};

export const initializeAnes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANES",
      data: anecdotes,
    });
  };
};
const anecdoteRecuder = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAne = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAne
      );
    case "NEW_ANE":
      return [...state, action.data];
    case "INIT_ANES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteRecuder;
