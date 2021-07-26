import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";
import thunk from "redux-thunk";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogReducer,
  user: loginReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
