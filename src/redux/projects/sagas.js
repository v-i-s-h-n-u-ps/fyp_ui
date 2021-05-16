import { takeLatest, call, put, select } from "redux-saga/effects";

import { REQUEST, SUCCESS, FAILURE } from "../actionCreator";
import {
    sendPayload, sendPayloadFailure, isSuccess
} from "../_helpers/helperSaga";
import {
    CREATE_PROJECT, MANAGE_PARTICIPANTS, MY_PROJECTS,
    GET_PROJECTS_HOME, PROJECT_DETAILS, PROJECT_PARTICIPANTS,
    UPDATE_PROJECT,
} from "./types";
import {
    getFilteredProjects, createProjects, updateProjects,
    getProjectDetails, getProjects, getParticipants,
    manageParticipants, getMyProjects
} from "@services/";


function* handleGetMyProject({ data }) {
    try {
        const apiResponse = yield call(getMyProjects, data);
        yield sendPayload(apiResponse, MY_PROJECTS);
    } catch (e) {
        yield sendPayloadFailure(e, MY_PROJECTS);
    }
}

function* handleCreateProject({ data }) {
    try {
        const apiResponse = yield call(createProjects, data);
        if (isSuccess) {
            yield put({ type: MY_PROJECTS[REQUEST] })
        }
        yield sendPayload(apiResponse, CREATE_PROJECT);
    } catch (e) {
        yield sendPayloadFailure(e, CREATE_PROJECT);
    }
}

function* handleUpdateProject({ data }) {
    try {
        const apiResponse = yield call(updateProjects, data);
        yield sendPayload(apiResponse, UPDATE_PROJECT);
    } catch (e) {
        yield sendPayloadFailure(e, UPDATE_PROJECT);
    }
}

function* handleGetProject({ data }) {
    try {
        const apiResponse = yield call(getProjects, data);
        yield sendPayload(apiResponse, GET_PROJECTS_HOME);
    } catch (e) {
        yield sendPayloadFailure(e, GET_PROJECTS_HOME);
    }
}

function* handleProjectDetails({ data }) {
    try {
        const apiResponse = yield call(getProjectDetails, data);
        yield sendPayload(apiResponse, PROJECT_DETAILS);
    } catch (e) {
        yield sendPayloadFailure(e, PROJECT_DETAILS);
    }
}

function* handleProjectParticipants({ data }) {
    try {
        const apiResponse = yield call(getParticipants, data);
        yield sendPayload(apiResponse, PROJECT_PARTICIPANTS);
    } catch (e) {
        yield sendPayloadFailure(e, PROJECT_PARTICIPANTS);
    }
}

function* handleManageParticipants({ data }) {
    try {
        const apiResponse = yield call(manageParticipants, data);
        yield sendPayload(apiResponse, MANAGE_PARTICIPANTS);
    } catch (e) {
        yield sendPayloadFailure(e, MANAGE_PARTICIPANTS);
    }
}

export const projectSaga = {
    watchGetMyProject: takeLatest(MY_PROJECTS[REQUEST], handleGetMyProject),
    watchCreateProject: takeLatest(CREATE_PROJECT[REQUEST], handleCreateProject),
    watchUpdateProject: takeLatest(UPDATE_PROJECT[REQUEST], handleUpdateProject),
    watchGetProject: takeLatest(GET_PROJECTS_HOME[REQUEST], handleGetProject),
    watchProjectDetails: takeLatest(PROJECT_DETAILS[REQUEST], handleProjectDetails),
    watchProjectParticipants: takeLatest(PROJECT_PARTICIPANTS[REQUEST], handleProjectParticipants),
    watchManageParticipants: takeLatest(MANAGE_PARTICIPANTS[REQUEST], handleManageParticipants),
}
