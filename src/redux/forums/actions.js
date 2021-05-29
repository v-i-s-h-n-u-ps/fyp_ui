import { action, FAILURE, REQUEST, SET, SUCCESS, UNSET } from "../actionCreator";
import {
    CREATE_FORUMS, GET_FORUMS, GET_MEMBERS,
    MANAGE_MEMBERS, UPDATE_FORUMS,
    GET_FORUM_DETAILS
} from "./types";

export const createForums = {
    request: data => action(CREATE_FORUMS[REQUEST], { data }),
    success: (data, response) => action(CREATE_FORUMS[SUCCESS], { data, response }),
    failure: (data, error) => action(CREATE_FORUMS[FAILURE], { data, error }),
};

export const getForums = {
    request: data => action(GET_FORUMS[REQUEST], { data }),
    success: (data, response) => action(GET_FORUMS[SUCCESS], { data, response }),
    failure: (data, error) => action(GET_FORUMS[FAILURE], { data, error }),
};

export const updateForums = {
    request: data => action(UPDATE_FORUMS[REQUEST], { data }),
    success: (data, response) => action(UPDATE_FORUMS[SUCCESS], { data, response }),
    failure: (data, error) => action(UPDATE_FORUMS[FAILURE], { data, error }),
};

export const getForumDetails = {
    request: data => action(GET_FORUM_DETAILS[REQUEST], { data }),
    success: (data, response) => action(GET_FORUM_DETAILS[SUCCESS], { data, response }),
    failure: (data, error) => action(GET_FORUM_DETAILS[FAILURE], { data, error }),
};

export const manageForumMembers = {
    request: data => action(MANAGE_MEMBERS[REQUEST], { data }),
    success: (data, response) => action(MANAGE_MEMBERS[SUCCESS], { data, response }),
    failure: (data, error) => action(MANAGE_MEMBERS[FAILURE], { data, error }),
};
