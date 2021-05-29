import { combineReducers } from "redux";
import users from "./user/reducer";
import aux from "./auxiliary/reducer";
import resources from "./resources/reducer";
import projects from "./projects/reducer";
import miscellaneous from "./miscellaneous/reducer";
import forums from "./forums/reducer";

const rootReducer = combineReducers({
  users: users(),
  aux: aux(),
  resources: resources(),
  projects: projects(),
  miscellaneous: miscellaneous(),
  forums: forums(),
});

export default rootReducer;
