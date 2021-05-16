import { combineReducers } from "redux";
import _get from "lodash/get";

import {
    SET_NEW_CHAT_USER
} from "./types";
import { FAILURE, REQUEST, SUCCESS, UNSET, SET } from "../actionCreator";

const initialState = {
    isLoading: false,
    isLoaded: false,
    data: null
};

const miscellaneous = () => {
    const chat = (state = initialState, action) => {
        switch (action.type) {
            case SET_NEW_CHAT_USER[SET]:
                return { ...state, data: action.data }
            case SET_NEW_CHAT_USER[UNSET]:
                return { ...state, data: {} }
            default: return state;
        }
    };

    return combineReducers({
        chat
    });
};

export default miscellaneous;
