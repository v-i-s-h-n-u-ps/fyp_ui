import { action, FAILURE, REQUEST, SUCCESS, UNSET } from "../actionCreator";
import {
    CREATE_PROJECT, MY_PROJECTS, SET_PROJECT_DETAILS,
    GET_PROJECTS_HOME, PROJECT_DETAILS, PROJECT_PARTICIPANTS, 
    SET_PROJECTS_HOME, UPDATE_PROJECT, MANAGE_PARTICIPANTS,
    ADD_PROJECT_TASK, GET_PROJECT_TASK, UPDATE_PROJECT_TASK,
    DELETE_PROJECTS
} from "./types";

export const getMyProjects = {
    request: () => action(MY_PROJECTS[REQUEST]),
    success: (data, response) => action(MY_PROJECTS[SUCCESS], { data, response }),
    failure: (data, error) => action(MY_PROJECTS[FAILURE], { data, error }),
}

export const createProject = {
    request: data => action(CREATE_PROJECT[REQUEST], { data }),
    success: (data, response) => action(CREATE_PROJECT[SUCCESS], { data, response }),
    failure: (data, error) => action(CREATE_PROJECT[FAILURE], { data, error }),
}

export const updateProject = {
    request: data => action(UPDATE_PROJECT[REQUEST], { data }),
    success: (data, response) => action(UPDATE_PROJECT[SUCCESS], { data, response }),
    failure: (data, error) => action(UPDATE_PROJECT[FAILURE], { data, error }),
}

export const getProjectHome = {
    request: data => action(GET_PROJECTS_HOME[REQUEST], { data }),
    success: (data, response) => action(GET_PROJECTS_HOME[SUCCESS], { data, response }),
    failure: (data, error) => action(GET_PROJECTS_HOME[FAILURE], { data, error }),
    unset: () => action(SET_PROJECTS_HOME[UNSET]),
}

export const getProjectDetails = {
    request: data => action(PROJECT_DETAILS[REQUEST], { data }),
    success: (data, response) => action(PROJECT_DETAILS[SUCCESS], { data, response }),
    failure: (data, error) => action(PROJECT_DETAILS[FAILURE], { data, error }),
    unset: () => action(SET_PROJECT_DETAILS[UNSET])
}

export const getProjectParticipants = {
    request: data => action(PROJECT_PARTICIPANTS[REQUEST], { data }),
    success: (data, response) => action(PROJECT_PARTICIPANTS[SUCCESS], { data, response }),
    failure: (data, error) => action(PROJECT_PARTICIPANTS[FAILURE], { data, error }),
}

export const manageProjectParticipants = {
    request: data => action(MANAGE_PARTICIPANTS[REQUEST], { data }),
    success: (data, response) => action(MANAGE_PARTICIPANTS[SUCCESS], { data, response }),
    failure: (data, error) => action(MANAGE_PARTICIPANTS[FAILURE], { data, error }),
}

export const addProjectTask = {
    request: data => action(ADD_PROJECT_TASK[REQUEST], { data }),
    success: (data, response) => action(ADD_PROJECT_TASK[SUCCESS], { data, response }),
    failure: (data, error) => action(ADD_PROJECT_TASK[FAILURE], { data, error }),
}

export const updateProjectTask = {
    request: data => action(UPDATE_PROJECT_TASK[REQUEST], { data }),
    success: (data, response) => action(UPDATE_PROJECT_TASK[SUCCESS], { data, response }),
    failure: (data, error) => action(UPDATE_PROJECT_TASK[FAILURE], { data, error }),
}

export const getProjectTask = {
    request: data => action(GET_PROJECT_TASK[REQUEST], { data }),
    success: (data, response) => action(GET_PROJECT_TASK[SUCCESS], { data, response }),
    failure: (data, error) => action(GET_PROJECT_TASK[FAILURE], { data, error }),
}

export const deleteProjects = {
    request: data => action(DELETE_PROJECTS[REQUEST], { data }),
    success: (data, response) => action(DELETE_PROJECTS[SUCCESS], { data, response }),
    failure: (data, error) => action(DELETE_PROJECTS[FAILURE], { data, error }),
}
