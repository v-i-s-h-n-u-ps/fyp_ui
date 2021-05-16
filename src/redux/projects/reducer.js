import { combineReducers } from "redux";

import {
    CREATE_PROJECT, MY_PROJECTS, 
    GET_PROJECTS_HOME, PROJECT_DETAILS, PROJECT_PARTICIPANTS,
    SET_PROJECTS_HOME, UPDATE_PROJECT, MANAGE_PARTICIPANTS
} from "./types";
import { FAILURE, REQUEST, SUCCESS, UNSET } from "../actionCreator";

const initialState = {
    isLoading: false,
    isLoaded: false,
    data: null
};

const projects = () => {
    const myProjects = (state = initialState, action) => {
        switch (action.type) {
            case MY_PROJECTS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case MY_PROJECTS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case MY_PROJECTS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    const manageProject = (state = initialState, action) => {
        switch (action.type) {
            case CREATE_PROJECT[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case CREATE_PROJECT[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true }
            case CREATE_PROJECT[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case UPDATE_PROJECT[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case UPDATE_PROJECT[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true }
            case UPDATE_PROJECT[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case MANAGE_PARTICIPANTS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case MANAGE_PARTICIPANTS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true }
            case MANAGE_PARTICIPANTS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    const projectDetails = (state = initialState, action) => {
        switch (action.type) {
            case PROJECT_DETAILS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case PROJECT_DETAILS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case PROJECT_DETAILS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case PROJECT_PARTICIPANTS[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case PROJECT_PARTICIPANTS[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true, data: { ...state.data, participants: action.payload } }
            case PROJECT_PARTICIPANTS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    const dashboardProjects = (state = initialState, action) => {
        switch (action.type) {
            case GET_PROJECTS_HOME[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case GET_PROJECTS_HOME[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case GET_PROJECTS_HOME[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case SET_PROJECTS_HOME[UNSET]:
                return { ...state, isLoading: false, isLoaded: false, data: null }
            default: return state;
        }
    };

    return combineReducers({
        myProjects,
        manageProject,
        projectDetails,
        dashboardProjects
    });
};

export default projects;
