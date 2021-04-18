import { takeLatest, call, put, all, select } from "redux-saga/effects";
import _get from "lodash/get";
import _omit from "lodash/omit";
import _isEmpty from "lodash/isEmpty";
import Router from 'next/router';
import cookie from 'js-cookie'

import { config } from "../../config";
import { REQUEST, SUCCESS } from "../actionCreator";
import { sendPayload, sendPayloadFailure, isSuccess } from "../_helpers/helperSaga";
import {
  ROOT, DASHBOARD
} from "../../utils/constants/routes";
import {
  LOGOUT, LOGIN, SIGNUP, AUTHENTICATE, ME
} from "./types";
import {
  selectUserInfo
} from "./selectors";
import { REMOVE_AUTH, SET_AUTH } from "../../utils/services/auth";
import {
  api,
  login, signup, me
} from "../../utils/services/index"

function* handleLogoutUser() {
  try {
    REMOVE_AUTH();
    yield put({ type: LOGOUT[SUCCESS] });
    yield call(Router.push, ROOT);
  } catch (e) {
    yield sendPayloadFailure(e, LOGOUT);
  }
}

function* handleLogin({ data }) {
  try {
    const apiResponse = yield call(login, data);
    console.log(isSuccess(apiResponse), "")
    if (isSuccess(apiResponse)) {
      cookie.set('loginTime', new Date(), { domain: config["domain"] || "" });
      yield call(Router.push, DASHBOARD);
      yield put({
        type: AUTHENTICATE[REQUEST],
        data: _omit(apiResponse.data.data, ['user_info'])
      })
    }
      yield sendPayload(apiResponse, LOGIN);
  } catch (e) {
    yield sendPayloadFailure(e, LOGIN);
  }
}

function* handleAuth({ data }) {
  try {
    if (data.access_token) {
      SET_AUTH(data);
      const user = yield select(selectUserInfo);
      if(_isEmpty(user) || !user) {
        yield put({ type: ME[REQUEST] })
      }
    } else {
      REMOVE_AUTH()
    }
    yield put({ type: AUTHENTICATE[SUCCESS] });
  } catch (e) {
    yield sendPayloadFailure(e, AUTHENTICATE);
  }
}

function* handleMe() {
  try {
    const apiResponse = yield call(me);
    yield sendPayload(apiResponse, ME);
  } catch (e) {
    yield sendPayloadFailure(e, ME);
  }
}

function* handleSignup({ data }) {
  try {
    const apiResponse = yield call(signup, data);
    yield sendPayload(apiResponse, SIGNUP);
  } catch (e) {
    yield sendPayloadFailure(e, SIGNUP);
  }
}


export const userSaga = {
  watchLogoutUser: takeLatest(LOGOUT[REQUEST], handleLogoutUser),
  watchLogin: takeLatest(LOGIN[REQUEST], handleLogin),
  watchSignup: takeLatest(SIGNUP[REQUEST], handleSignup),
  watchAuth: takeLatest(AUTHENTICATE[REQUEST], handleAuth),
  watchMe: takeLatest(ME[REQUEST], handleMe),
}


