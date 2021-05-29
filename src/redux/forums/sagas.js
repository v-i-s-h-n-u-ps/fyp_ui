import { takeLatest, call, put, select } from "redux-saga/effects";

import { REQUEST, SUCCESS, FAILURE } from "../actionCreator";
import {
    sendPayload, sendPayloadFailure, isSuccess
} from "../_helpers/helperSaga";
import {
    CREATE_FORUMS, GET_FORUMS, GET_FORUM_DETAILS,
    MANAGE_MEMBERS, UPDATE_FORUMS
} from "./types";
import {
    getForums, getForumDetails, createForums,
    updateForums, manageForumMembers
} from "@services/";

function* handleCreateForum({ data }) {
    try {
        const apiResponse = yield call(createForums, data);
        if (isSuccess) {
            yield put({ type: GET_FORUMS[REQUEST] })
        }
        yield sendPayload(apiResponse, CREATE_FORUMS);
    } catch (e) {
        yield sendPayloadFailure(e, CREATE_FORUMS);
    }
}

function* handleUpdateForum({ data }) {
    try {
        const apiResponse = yield call(updateForums, data);
        if (isSuccess) {
            yield put({ type: GET_FORUMS[REQUEST] })
        }
        yield sendPayload(apiResponse, UPDATE_FORUMS);
    } catch (e) {
        yield sendPayloadFailure(e, UPDATE_FORUMS);
    }
}

function* handleGetForum() {
    try {
        const apiResponse = yield call(getForums);
        yield sendPayload(apiResponse, GET_FORUMS);
    } catch (e) {
        yield sendPayloadFailure(e, GET_FORUMS);
    }
}

function* handleForumDetails({ data }) {
    try {
        const apiResponse = yield call(getForumDetails, data);
        yield sendPayload(apiResponse, GET_FORUM_DETAILS);
    } catch (e) {
        yield sendPayloadFailure(e, GET_FORUM_DETAILS);
    }
}

function* handleManageMembers({ data }) {
    try {
        const apiResponse = yield call(manageForumMembers, data);
        if (isSuccess) {
            yield put({
                type: GET_FORUM_DETAILS[REQUEST],
                data: { id: data.forum }
            })
        }
        yield sendPayload(apiResponse, MANAGE_MEMBERS);
    } catch (e) {
        yield sendPayloadFailure(e, MANAGE_MEMBERS);
    }
}

export const forumSaga = {
    watchCreateForum: takeLatest(CREATE_FORUMS[REQUEST], handleCreateForum),
    watchUpdateForum: takeLatest(UPDATE_FORUMS[REQUEST], handleUpdateForum),
    watchGetForum: takeLatest(GET_FORUMS[REQUEST], handleGetForum),
    watchForumDetails: takeLatest(GET_FORUM_DETAILS[REQUEST], handleForumDetails),
    watchManageMembers: takeLatest(MANAGE_MEMBERS[REQUEST], handleManageMembers),
}
