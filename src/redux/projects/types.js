import { createFlagTypes, createRequestTypes } from "../actionCreator";

export const MY_PROJECTS =  createRequestTypes("MY_PROJECTS");
export const CREATE_PROJECT = createRequestTypes("CREATE_PROJECT");
export const UPDATE_PROJECT = createRequestTypes("UPDATE_PROJECT");
export const GET_PROJECTS_HOME = createRequestTypes("GET_PROJECTS_HOME");
export const SET_PROJECTS_HOME = createFlagTypes("SET_PROJECTS_HOME");
export const PROJECT_DETAILS = createRequestTypes("PROJECT_DETAILS");
export const SET_PROJECT_DETAILS = createFlagTypes("SET_PROJECT_DETAILS");
export const PROJECT_PARTICIPANTS = createRequestTypes("PROJECT_PARTICIPANTS");
export const MANAGE_PARTICIPANTS = createRequestTypes("MANAGE_PARTICIPANTS");
