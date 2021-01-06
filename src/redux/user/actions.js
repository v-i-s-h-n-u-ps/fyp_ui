import {action, FAILURE, REQUEST, SET, SUCCESS, UNSET} from "../actionCreator";
import {
    LOGOUT,
} from "./types";

export const logout = {
    request: data => action(LOGOUT[REQUEST], { data }),
    success: (data, response) => action(LOGOUT[SUCCESS], { data, response }),
    failure: (data, error) => action(LOGOUT[FAILURE], { data, error }),
};