import { combineReducers } from "redux";
import _get from "lodash/get";

import {
    CREATE_PROJECT, MY_PROJECTS, SET_PROJECT_DETAILS,
    GET_PROJECTS_HOME, PROJECT_DETAILS, PROJECT_PARTICIPANTS,
    SET_PROJECTS_HOME, UPDATE_PROJECT, MANAGE_PARTICIPANTS,
    ADD_PROJECT_TASK, GET_PROJECT_TASK, UPDATE_PROJECT_TASK
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
                let data = Object.assign({}, state.data);
                data['participants'] = action.payload;
                return { ...state, isLoading: false, isLoaded: true, data: data }
            case PROJECT_PARTICIPANTS[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case SET_PROJECT_DETAILS[UNSET]: return initialState
            default: return state;
        }
    };

    const dashboardProjects = (state = initialState, action) => {
        switch (action.type) {
            case GET_PROJECTS_HOME[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case GET_PROJECTS_HOME[SUCCESS]:
                let prevData = Object.assign([], _get(state, 'data', {}));
                const currentData = _get(action, 'payload.data', []);
                const pageInfo = _get(action, 'payload.pageInfo', {});
                const data = pageInfo.current === 1
                    ? currentData
                    : prevData.data.length
                        ? [...prevData.data, ...currentData]
                        : currentData;
                prevData.data = data;
                prevData.pageInfo = pageInfo;
                return { ...state, isLoading: false, isLoaded: true, data: prevData }
            case GET_PROJECTS_HOME[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case SET_PROJECTS_HOME[UNSET]:
                return { ...state, isLoading: false, isLoaded: false, data: null }
            default: return state;
        }
    };

    const projectTasks = (state = initialState, action) => {
        switch (action.type) {
            case ADD_PROJECT_TASK[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case ADD_PROJECT_TASK[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true }
            case ADD_PROJECT_TASK[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case UPDATE_PROJECT_TASK[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case UPDATE_PROJECT_TASK[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true }
            case UPDATE_PROJECT_TASK[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            case GET_PROJECT_TASK[REQUEST]:
                return { ...state, isLoading: true, isLoaded: false }
            case GET_PROJECT_TASK[SUCCESS]:
                return { ...state, isLoading: false, isLoaded: true, data: action.payload }
            case GET_PROJECT_TASK[FAILURE]:
                return { ...state, isLoading: false, error: action.payload.error, isLoaded: false }
            default: return state;
        }
    };

    return combineReducers({
        myProjects,
        manageProject,
        projectDetails,
        dashboardProjects,
        projectTasks
    });
};

export default projects;
