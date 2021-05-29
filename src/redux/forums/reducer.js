import { combineReducers } from "redux";
import _get from "lodash/get";

import {
    CREATE_FORUMS, GET_FORUMS,
    MANAGE_MEMBERS, UPDATE_FORUMS, 
    GET_FORUM_DETAILS
} from "./types";
import { FAILURE, REQUEST, SUCCESS, UNSET, SET } from "../actionCreator";

const initialState = {
    isLoading: false,
    isLoaded: false,
    data: null
};

const discussion = () => {
    const forums = (state = initialState, action) => {
        switch (action.type) {
            case GET_FORUMS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false, data: [] }
            case GET_FORUMS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case GET_FORUMS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case GET_FORUM_DETAILS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false, details: {} }
            case GET_FORUM_DETAILS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true, details: action.payload }
            case GET_FORUM_DETAILS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    const manageForums = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_FORUMS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case CREATE_FORUMS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true }
            case CREATE_FORUMS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case UPDATE_FORUMS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case UPDATE_FORUMS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true }
            case UPDATE_FORUMS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case MANAGE_MEMBERS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case MANAGE_MEMBERS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true }
            case MANAGE_MEMBERS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    return combineReducers({
        forums, manageForums
    });
};

export default discussion;
