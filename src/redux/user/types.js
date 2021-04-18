import {createFlagTypes, createRequestTypes} from "../actionCreator";

export const SIGNUP = createRequestTypes("SIGNUP");
export const LOGIN = createRequestTypes("LOGIN");
export const AUTHENTICATE = createRequestTypes("AUTHENTICATE");
export const ME = createRequestTypes("ME");
export const LOGOUT = createRequestTypes("LOGOUT");
export const VERIFY_OTP = createRequestTypes("VERIFY_OTP");
export const CHECK_USER_EXISTS = createRequestTypes("CHECK_USER_EXISTS");
export const FORCED_REDIRECTION_TO_LOGIN = createFlagTypes("FORCED_REDIRECTION_TO_LOGIN");
export const MID_GUARD_AUTH_ROUTE_CAPTURED = createFlagTypes("MID_GUARD_AUTH_ROUTE_CAPTURED");
export const SET_REDIRECTION = createRequestTypes("SET_REDIRECTION");
export const THEME_PREFERENCE = createFlagTypes("THEME_PREFERENCE");
export const DEVICE_ID = createFlagTypes("DEVICE_ID");
export const LOCALE_PREFERENCE = createFlagTypes("LOCALE_PREFERENCE");