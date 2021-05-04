import { takeLatest, call, put, select } from "redux-saga/effects";

import { config } from "@config";
import { REQUEST, SUCCESS, FAILURE } from "../actionCreator";
import {
    sendPayload, sendPayloadFailure, isSuccess
} from "../_helpers/helperSaga";
import {
    CATEGORY, ROLE, TYPE, UNIVERSITY
} from "./types";
import {
    getUniversity, getRole, getType,
    getCategory
} from "@services";

function* handleGetUniversity() {
    try {
        const apiResponse = yield call(getUniversity);
        yield sendPayload(apiResponse, UNIVERSITY);
    } catch (e) {
        yield sendPayloadFailure(e, UNIVERSITY);
    }
}

function* handleGetRole() {
    try {
        const apiResponse = yield call(getRole);
        yield sendPayload(apiResponse, ROLE);
    } catch (e) {
        yield sendPayloadFailure(e, ROLE);
    }
}

function* handleGetTypes() {
    try {
        const apiResponse = yield call(getType);
        yield sendPayload(apiResponse, TYPE);
    } catch (e) {
        yield sendPayloadFailure(e, TYPE);
    }
}

function* handleGetCategory() {
    try {
        const apiResponse = yield call(getCategory);
        yield sendPayload(apiResponse, CATEGORY);
    } catch (e) {
        yield sendPayloadFailure(e, CATEGORY);
    }
}

export const resourceSaga = {
    watchGetUniversity: takeLatest(UNIVERSITY[REQUEST], handleGetUniversity),
    watchGetRole: takeLatest(ROLE[REQUEST], handleGetRole),
    watchGetTypes: takeLatest(TYPE[REQUEST], handleGetTypes),
    watchGetCategory: takeLatest(CATEGORY[REQUEST], handleGetCategory),

}


