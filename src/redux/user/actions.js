import { action, FAILURE, REQUEST, SET, SUCCESS, UNSET } from "../actionCreator";
import {
    LOGOUT, SIGNUP, LOGIN, AUTHENTICATE,
    THEME_PREFERENCE, REFRESH, PASSWORD_RESET,
    PASSWORD_RESET_REQUEST, RESET_OTP_SEND,
    OTP_SEND, ACTIVATE, SAVE_STUDENT, RESEND_OTP,
    UPDATE_STUDENT, SEARCH_USERS, UPDATE_USER,
    UNSET_ERRORS, GET_USER_PROFILE, USER_PROFILE,
    CHANGE_PASSWORD
} from "./types";

export const unsetErrors = {
    unset: () => action(UNSET_ERRORS[UNSET])
}

export const changePassword = {
    request: data => action(CHANGE_PASSWORD[REQUEST], { data }),
    success: (data, response) => action(CHANGE_PASSWORD[SUCCESS], { data, response }),
    failure: (data, error) => action(CHANGE_PASSWORD[FAILURE], { data, error }),
};

export const getUserProfile = {
    request: data => action(GET_USER_PROFILE[REQUEST], { data }),
    success: (data, response) => action(GET_USER_PROFILE[SUCCESS], { data, response }),
    failure: (data, error) => action(GET_USER_PROFILE[FAILURE], { data, error }),
    unset: () => action(USER_PROFILE[UNSET])
};

export const signup = {
    request: data => action(SIGNUP[REQUEST], { data }),
    success: (data, response) => action(SIGNUP[SUCCESS], { data, response }),
    failure: (data, error) => action(SIGNUP[FAILURE], { data, error }),
};

export const login = {
    request: data => action(LOGIN[REQUEST], { data }),
    success: (data, response) => action(LOGIN[SUCCESS], { data, response }),
    failure: (data, error) => action(LOGIN[FAILURE], { data, error }),
};

export const authentication = {
    request: data => action(AUTHENTICATE[REQUEST], { data }),
    success: (data, response) => action(AUTHENTICATE[SUCCESS], { data, response }),
    failure: (data, error) => action(AUTHENTICATE[FAILURE], { data, error }),
};

export const logout = {
    request: data => action(LOGOUT[REQUEST], { data }),
    success: (data, response) => action(LOGOUT[SUCCESS], { data, response }),
    failure: (data, error) => action(LOGOUT[FAILURE], { data, error }),
}

export const refresh = {
    request: data => action(REFRESH[REQUEST], { data }),
    success: (data, response) => action(REFRESH[SUCCESS], { data, response }),
    failure: (data, error) => action(REFRESH[FAILURE], { data, error }),
}

export const passwordResetRequest = {
    request: data => action(PASSWORD_RESET_REQUEST[REQUEST], { data }),
    success: (data, response) => action(PASSWORD_RESET_REQUEST[SUCCESS], { data, response }),
    failure: (data, error) => action(PASSWORD_RESET_REQUEST[FAILURE], { data, error }),
}

export const passwordReset = {
    request: data => action(PASSWORD_RESET[REQUEST], { data }),
    success: (data, response) => action(PASSWORD_RESET[SUCCESS], { data, response }),
    failure: (data, error) => action(PASSWORD_RESET[FAILURE], { data, error }),
}

export const activate = {
    request: data => action(ACTIVATE[REQUEST], { data }),
    success: (data, response) => action(ACTIVATE[SUCCESS], { data, response }),
    failure: (data, error) => action(ACTIVATE[FAILURE], { data, error }),
}

export const saveStudent = {
    request: data => action(SAVE_STUDENT[REQUEST], { data }),
    success: (data, response) => action(SAVE_STUDENT[SUCCESS], { data, response }),
    failure: (data, error) => action(SAVE_STUDENT[FAILURE], { data, error }),
}

export const updateStudent = {
    request: data => action(UPDATE_STUDENT[REQUEST], { data }),
    success: (data, response) => action(UPDATE_STUDENT[SUCCESS], { data, response }),
    failure: (data, error) => action(UPDATE_STUDENT[FAILURE], { data, error }),
}

export const resendOTP = {
    request: data => action(RESEND_OTP[REQUEST], { data }),
    success: (data, response) => action(RESEND_OTP[SUCCESS], { data, response }),
    failure: (data, error) => action(RESEND_OTP[FAILURE], { data, error }),
}

export const searchUsers = {
    request: data => action(SEARCH_USERS[REQUEST], { data }),
    success: (data, response) => action(SEARCH_USERS[SUCCESS], { data, response }),
    failure: (data, error) => action(SEARCH_USERS[FAILURE], { data, error }),
}

export const updateUser = {
    request: data => action(UPDATE_USER[REQUEST], { data }),
    success: (data, response) => action(UPDATE_USER[SUCCESS], { data, response }),
    failure: (data, error) => action(UPDATE_USER[FAILURE], { data, error }),
}

export const otpSend = {
    set: () => action(OTP_SEND[SET]),
    unset: () => action(OTP_SEND[UNSET])
}

export const resetOtpSend = {
    set: () => action(RESET_OTP_SEND[SET]),
    unset: () => action(RESET_OTP_SEND[UNSET])
}

export const themePreference = {
    set: (theme) => action(THEME_PREFERENCE[SET], {theme})
};

