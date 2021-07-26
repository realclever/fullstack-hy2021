import usersService from "../services/users";

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users,
    });
  };
};

const usersReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

export default usersReducer;
