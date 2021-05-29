import { createFlagTypes, createRequestTypes } from "../actionCreator";

export const GET_FORUMS = createRequestTypes("GET_FORUMS");
export const CREATE_FORUMS = createRequestTypes("CREATE_FORUMS");
export const UPDATE_FORUMS = createRequestTypes("UPDATE_FORUMS");
export const MANAGE_MEMBERS = createRequestTypes("MANAGE_MEMBERS");
export const GET_FORUM_DETAILS = createRequestTypes("GET_FORUM_DETAILS");
