import { put, call } from "redux-saga/effects";
import _get from "lodash/get";
import Router from "next/router";

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
                : apiResponse.data
            : {}
    });
}

export function* sendPayloadFailure(error, event) {
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

export function* reRoute(ctx, guard, redirect) {
    const pathname = _get(ctx, 'pathname') || _get(Router, 'pathname');
    if (guard.includes(pathname)) {
        if (ctx && ctx.req) {
            ctx.res.writeHead(302, { Location: redirect });
            ctx.res.end();
            return;
        } else {
            yield call(Router.push, redirect);
        }
    }
}
