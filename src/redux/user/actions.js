import { action, FAILURE, REQUEST, SET, SUCCESS, UNSET } from "../actionCreator";
import {
    LOGOUT, SIGNUP, LOGIN, AUTHENTICATE,
    THEME_PREFERENCE
} from "./types";

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

export const themePreference = {
    set: (theme) => action(THEME_PREFERENCE[SET], {theme})
};

