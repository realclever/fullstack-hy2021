import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdoteRecuder from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  anecdotes: anecdoteRecuder,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => console.log(store.getState()));

export default store;
