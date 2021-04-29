import { put } from "redux-saga/effects";

import { FAILURE, SUCCESS } from "../actionCreator";

export const isSuccess = apiResponse => {
    return !!apiResponse.data.success || 
        apiResponse.status === 200 || 
        apiResponse.status === 201
}

export function* sendPayload(apiResponse, event) {
    yield put({
        type: isSuccess(apiResponse) ? event[SUCCESS] : event[FAILURE],
        payload: apiResponse.data
            ? isSuccess(apiResponse)
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
            payload: error.response.error
        });
    } else {
        if (error.status === undefined) {
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
