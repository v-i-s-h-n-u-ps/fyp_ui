import { combineReducers } from "redux";

import {
    CATEGORY, ROLE, TYPE, UNIVERSITY
} from "./types";
import { FAILURE, REQUEST, SUCCESS } from "../actionCreator";

const initialState = {
    isLoading: false,
    isLoaded: false,
    data: []
};

const resources = () => {
    const university = (state = initialState, action) => {
        switch (action.type) {
            case UNIVERSITY[REQUEST]: return { ...state, isLoading: true, isLoaded: false }
            case UNIVERSITY[SUCCESS]: return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case UNIVERSITY[FAILURE]: return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    const type = (state = initialState, action) => {
        switch (action.type) {
            case TYPE[REQUEST]: return { ...state, isLoading: true, isLoaded: false }
            case TYPE[SUCCESS]: return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case TYPE[FAILURE]: return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    const role = (state = initialState, action) => {
        switch (action.type) {
            case ROLE[REQUEST]: return { ...state, isLoading: true, isLoaded: false }
            case ROLE[SUCCESS]: return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case ROLE[FAILURE]: return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    const category = (state = initialState, action) => {
        switch (action.type) {
            case CATEGORY[REQUEST]: return { ...state, isLoading: true, isLoaded: false }
            case CATEGORY[SUCCESS]: return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case CATEGORY[FAILURE]: return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    return combineReducers({
        university,
        type,
        role, 
        category,
    });
};

export default resources;