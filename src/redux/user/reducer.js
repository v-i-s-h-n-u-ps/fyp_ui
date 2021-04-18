import { combineReducers } from "redux";
import {
  LOGOUT, LOGIN, SIGNUP, ME, AUTHENTICATE
} from "./types";
import { FAILURE, REQUEST, SET, SUCCESS, UNSET } from "../actionCreator";

const initialState = {
  isAuthenticated: false,
  isOtpSent: false,
  isSubmitting: false,
  isFetching: false,
};

import { get as _get } from "lodash";

const users = () => {
  const auth = (state = initialState, action) => {
    switch (action.type) {

      case SIGNUP[REQUEST]: return { ...state, isSubmitting: true }
      case SIGNUP[SUCCESS]: return { ...state, isSubmitting: false, isOtpSent: true }
      case SIGNUP[FAILURE]: return { ...state, isSubmitting: false, error: action.payload.error }

      case LOGIN[REQUEST]: return { ...state, isSubmitting: true, isAuthenticated: false }
      case LOGIN[SUCCESS]: return { ...state, isSubmitting: false, userInfo: action.payload.user_info }
      case LOGIN[FAILURE]: return { ...state, isSubmitting: false, error: '', isAuthenticated: false }

      case AUTHENTICATE[REQUEST]: return { ...state, isAuthenticated: false }
      case AUTHENTICATE[SUCCESS]: return { ...state, isSubmitting: false, error: '', isAuthenticated: true }
      case AUTHENTICATE[FAILURE]: return { ...state, isAuthenticated: false }

      case ME[REQUEST]: return { ...state, isFetching: true, error: '' }
      case ME[SUCCESS]: return { ...state, isFetching: false, error: '', userInfo: action.payload }
      case ME[FAILURE]: return { ...state, isFetching: false, error: '' }

      case LOGOUT[SUCCESS]: return { ...state, isSubmitting: false, isAuthenticated: false, isOtpSent: false };

      default: return state;
    }
  };

  return combineReducers({
    auth,
  });
};

export default users;