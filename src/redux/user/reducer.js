import { combineReducers } from "redux";

import {
  LOGOUT, LOGIN, SIGNUP, ME, AUTHENTICATE,
  THEME_PREFERENCE, PASSWORD_RESET_REQUEST,
  PASSWORD_RESET, RESET_OTP_SEND, OTP_SEND,
  ACTIVATE, REFRESH, SAVE_STUDENT, RESEND_OTP,
  UPDATE_STUDENT
} from "./types";
import { FAILURE, REQUEST, SET, SUCCESS, UNSET } from "../actionCreator";

const initialState = {
  isAuthenticated: false,
  isOtpSent: false,
  isSubmitting: false,
  isFetching: false,
};

const initState = {
  isLoading: false,
  isLoaded: false,
  data: {}
};

const users = () => {
  const auth = (state = initialState, action) => {
    switch (action.type) {

      case SIGNUP[REQUEST]: return { ...state, isSubmitting: true, isOtpSent: false }
      case SIGNUP[SUCCESS]: return { ...state, isSubmitting: false, isOtpSent: true }
      case SIGNUP[FAILURE]: return { ...state, isSubmitting: false, error: action.payload.error, isOtpSent: false }

      case LOGIN[REQUEST]: return { ...state, isSubmitting: true, isAuthenticated: false }
      case LOGIN[SUCCESS]: return { ...state, isSubmitting: false, userInfo: action.payload.user_info }
      case LOGIN[FAILURE]: return { ...state, isSubmitting: false, error: '', isAuthenticated: false }

      case AUTHENTICATE[REQUEST]: return { ...state, isAuthenticated: false, isAuthenticating: true }
      case AUTHENTICATE[SUCCESS]: return { ...state, isSubmitting: false, error: '', isAuthenticated: true, token: action.payload, isAuthenticating: false }
      case AUTHENTICATE[FAILURE]: return { ...state, isAuthenticated: false, isAuthenticating: false }

      case ME[REQUEST]: return { ...state, isFetching: true, error: '' }
      case ME[SUCCESS]: return { ...state, isFetching: false, error: '', user: action.payload }
      case ME[FAILURE]: return { ...state, isFetching: false, error: '' }

      case PASSWORD_RESET_REQUEST[REQUEST]: return { ...state, isSubmitting: true, requestSuccess: false }
      case PASSWORD_RESET_REQUEST[SUCCESS]: return { ...state, isSubmitting: false, error: '', requestSuccess: true }
      case PASSWORD_RESET_REQUEST[FAILURE]: return { ...state, isSubmitting: false, requestSuccess: false }

      case PASSWORD_RESET[REQUEST]: return { ...state, isSubmitting: false }
      case PASSWORD_RESET[SUCCESS]: return { ...state, isSubmitting: false, error: '', requestSuccess: false }
      case PASSWORD_RESET[FAILURE]: return { ...state, isSubmitting: false }

      case ACTIVATE[REQUEST]: return { ...state, isSubmitting: true }
      case ACTIVATE[SUCCESS]: return { ...state, isSubmitting: false, isOtpSent: false }
      case ACTIVATE[FAILURE]: return { ...state, isSubmitting: false }

      case RESEND_OTP[REQUEST]: return { ...state, isSubmitting: true, isOtpSent: false, requestSuccess: false}
      case RESEND_OTP[SUCCESS]: return { ...state, isSubmitting: false, isOtpSent: true }
      case RESEND_OTP[FAILURE]: return { ...state, isSubmitting: false, isOtpSent: false }

      case OTP_SEND[SET]: return { ...state, isOtpSent: true, isSubmitting: false, }
      case OTP_SEND[UNSET]: return { ...state, isOtpSent: false, isSubmitting: false, }
      case RESET_OTP_SEND[SET]: return { ...state, requestSuccess: true, isSubmitting: false, }
      case RESET_OTP_SEND[UNSET]: return { ...state, requestSuccess: false, isSubmitting: false, }

      case LOGOUT[REQUEST]: return { ...state, isSubmitting: true, isOtpSent: false };
      case LOGOUT[SUCCESS]: return { ...state, isSubmitting: false, isAuthenticated: false };
      case LOGOUT[FAILURE]: return { ...state, isSubmitting: false };

      case REFRESH[REQUEST]: return { ...state, isRefreshing: true, isOtpSent: false };
      case REFRESH[SUCCESS]: return { ...state, isRefreshing: false, isAuthenticated: true };
      case REFRESH[FAILURE]: return { ...state, isRefreshing: false };

      default: return state;
    }
  };

  const student = (state=initState, action) => {
    switch(action.type) {
      case SAVE_STUDENT[REQUEST]: return { ...state, isLoading: true, isLoaded: false }
      case SAVE_STUDENT[SUCCESS]: return { ...state, isLoading: false, isLoaded: true }
      case SAVE_STUDENT[FAILURE]: return { ...state, isLoading: false, isLoaded: false }
      case UPDATE_STUDENT[REQUEST]: return { ...state, isLoading: true, isLoaded: false }
      case UPDATE_STUDENT[SUCCESS]: return { ...state, isLoading: false, isLoaded: true }
      case UPDATE_STUDENT[FAILURE]: return { ...state, isLoading: false, isLoaded: false }
      default: return state;
    }
  }

  const themePreference = (state = {
    theme:
      typeof window === 'undefined'
        ? 'light'
        : window.matchMedia('(prefers-color-scheme: dark)')
          ? 'dark' : 'light'
  }, action) => {
    if (action.type === THEME_PREFERENCE[SET]) {
      return { theme: action.theme }
    }
    return state
  };

  return combineReducers({
    auth, themePreference,
    student
  });
};

export default users;