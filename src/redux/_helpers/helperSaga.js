import { put } from "redux-saga/effects";

import { FAILURE, SUCCESS } from "../actionCreator";

export function* sendPayload(apiResponse, event) {
    yield put({
        serverDate: apiResponse.data.date,
        type: !!apiResponse.data.success ? event[SUCCESS] : event[FAILURE],
        payload: apiResponse.data
            ? apiResponse.data.success
                ? apiResponse.data.data
                : apiResponse.data.error
            : {}
    });
}

export function* sendPayloadFailure(error, event) {
    console.log(error)
    if (error.response) {
        yield put({
            type: event[FAILURE],
            payload: error.response.data ? error.response.data.error : {}
        });
    } else {
        if (error.status === undefined) {
            //network error
            yield put({
                type: event[FAILURE],
                payload: { code: "NETWORK_ERROR_CUSTOM" }
            });
        } else {
            yield put({
                type: event[FAILURE],
                payload: error.error
            });
        }
    }
}
