import { createFlagTypes, createRequestTypes } from "../actionCreator";

export const SIGNUP = createRequestTypes("SIGNUP");
export const LOGIN = createRequestTypes("LOGIN");
export const AUTHENTICATE = createRequestTypes("AUTHENTICATE");
export const ME = createRequestTypes("ME");
export const LOGOUT = createRequestTypes("LOGOUT");
export const PASSWORD_RESET_REQUEST = createRequestTypes("PASSWORD_RESET_REQUEST");
export const PASSWORD_RESET = createRequestTypes("PASSWORD_RESET");
export const OTP_SEND = createFlagTypes("OTP_SEND");
export const RESET_OTP_SEND = createFlagTypes("RESET_OTP_SEND");
export const ACTIVATE = createRequestTypes("ACTIVATE");
export const SAVE_STUDENT = createRequestTypes("SAVE_STUDENT");
export const UPDATE_STUDENT = createRequestTypes("UPDATE_STUDENT");
export const RESEND_OTP = createRequestTypes("RESEND_OTP")
export const SEARCH_USERS = createRequestTypes("SEARCH_USERS");
export const UPDATE_USER = createRequestTypes("UPDATE_USER");
export const UNSET_ERRORS = createFlagTypes("UNSET_ERRORS");
export const GET_USER_PROFILE = createRequestTypes("GET_USER_PROFILE");
export const USER_PROFILE = createFlagTypes("USER_PROFILE");
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");

export const REFRESH = createRequestTypes("REFRESH");
export const CHECK_USER_EXISTS = createRequestTypes("CHECK_USER_EXISTS");
export const FORCED_REDIRECTION_TO_LOGIN = createFlagTypes("FORCED_REDIRECTION_TO_LOGIN");
export const MID_GUARD_AUTH_ROUTE_CAPTURED = createFlagTypes("MID_GUARD_AUTH_ROUTE_CAPTURED");
export const SET_REDIRECTION = createRequestTypes("SET_REDIRECTION");
export const THEME_PREFERENCE = createFlagTypes("THEME_PREFERENCE");
export const DEVICE_ID = createFlagTypes("DEVICE_ID");
export const LOCALE_PREFERENCE = createFlagTypes("LOCALE_PREFERENCE");