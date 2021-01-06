import { combineReducers } from "redux";
import users from "./user/reducer";
import aux from "./auxiliary/reducer";

const rootReducer = combineReducers({
  users: users(),
  aux: aux(),
});

export default rootReducer;
