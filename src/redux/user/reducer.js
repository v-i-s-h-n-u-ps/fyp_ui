import { combineReducers } from "redux";
import {
  LOGOUT,
} from "./types";
import { FAILURE, REQUEST, SET, SUCCESS, UNSET } from "../actionCreator";

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  selectedCourse: null,
  isOtpSent: false,
};

import { get as _get } from "lodash";

const users = () => {
  const auth = (state = initialState, action) => {
    switch (action.type) {

      case LOGOUT[SUCCESS]: return { ...state, isFetching: false, isAuthenticated: false, isOtpSent: false };

      default: return state;
    }
  };

  return combineReducers({
    auth,
  });
};

export default users;