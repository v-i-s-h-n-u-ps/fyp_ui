import { takeLatest, call, put, all, select } from "redux-saga/effects";
import { get as _get } from "lodash"
import Router from 'next/router'

import { REQUEST, SUCCESS } from "../actionCreator";
import { sendPayload, sendPayloadFailure } from "../_helpers/helperSaga";
import {
  LOGOUT,
} from "./types";
import { REMOVE_AUTH } from "../../utils/services/auth";

function* handleLogoutUser() {
  try {
    REMOVE_AUTH();
    yield put({ type: LOGOUT[SUCCESS] });
    yield call(Router.push, '/');
  } catch (e) {
    yield sendPayloadFailure(e, LOGOUT);
  }
}

export const userSaga = {
  watchLogoutUser: takeLatest(LOGOUT[REQUEST], handleLogoutUser),
}


