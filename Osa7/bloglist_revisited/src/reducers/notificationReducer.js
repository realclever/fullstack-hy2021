const initialState = "";

export const notificationChange = (notification) => {
  return {
    type: "SET_NOTI",
    notification,
  };
};

export const notificationRemove = (notification) => {
  return {
    type: "REMOVE_NOTI",
    notification,
  };
};

let timer;
export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch(notificationChange(notification));
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      dispatch(notificationRemove(notification));
    }, 1000 * seconds);
  };
};

const notificationReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "SET_NOTI":
      return action.notification;
    case "REMOVE_NOTI":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
