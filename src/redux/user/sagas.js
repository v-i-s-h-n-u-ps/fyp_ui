import { takeLatest, call, put, all, select } from "redux-saga/effects";
import _get from "lodash/get";
import _omit from "lodash/omit";
import _isEmpty from "lodash/isEmpty";
import cookie from 'js-cookie'
import Router from "next/router";
import { toast } from "react-toastify";

import { config } from "../../config";
import { REQUEST, SUCCESS, FAILURE, SET } from "../actionCreator";
import { sendPayload, sendPayloadFailure, isSuccess } from "../_helpers/helperSaga";
import {
  ROOT, DASHBOARD, PRIVATE_ROUTES, PUBLIC_ROUTES
} from "../../utils/constants/routes";
import {
  LOGOUT, LOGIN, SIGNUP, AUTHENTICATE, ME, OTP_SEND,
  PASSWORD_RESET, PASSWORD_RESET_REQUEST, ACTIVATE,
  REFRESH
} from "./types";
import {
  selectUserInfo
} from "./selectors";
import { REMOVE_AUTH, SET_AUTH } from "@services/auth";
import {
  login, signup, me, passwordResetRequest,
  passwordReset, activate, logout, refresh
} from "@services"
import { GET_AUTH } from "@services/auth";

function* handleLogoutUser() {
  try {
    const data = {
      token: GET_AUTH({}).access_token
    }
    const apiResponse = yield call(logout, data);
    if (isSuccess(apiResponse)) {
      REMOVE_AUTH();
      yield call(Router.push, ROOT);

    }
    yield sendPayload(apiResponse, LOGOUT);
  } catch (e) {
    yield sendPayloadFailure(e, LOGOUT);
  }
}

function* handleLogin({ data }) {
  try {
    const apiResponse = yield call(login, data);
    if (apiResponse && apiResponse.status === 206 && apiResponse.data.code === "USER_NOT_ACTIVE") {
      yield put({ type: OTP_SEND[SET] });
      toast.info("Verify your account to login")
    } else {
      if (isSuccess(apiResponse)) {
        const loginTime = new Date();
        cookie.set('loginTime', loginTime, { domain: config["domain"] || "" });
        const tokens = { token: {..._omit(apiResponse.data.data, ['user_info'])}, loginTime }
        yield put({
          type: AUTHENTICATE[REQUEST],
          data: tokens,
        })
      }
      yield sendPayload(apiResponse, LOGIN);
    }
  } catch (e) {
    yield sendPayloadFailure(e, LOGIN);
  }
}

function* handleAuthentication({ data }) {
  try {
    const { token, ctx, loginTime } = data;
    const pathname = _get(ctx, 'pathname') || _get(Router, 'pathname');
    if (_get(token, 'access_token')) {
      SET_AUTH(token);
      if (PUBLIC_ROUTES.includes(pathname)) {
        if (ctx && ctx.req) {
          ctx.res.writeHead(302, { Location: DASHBOARD });
          ctx.res.end();
          return;
        } else {
          yield call(Router.push, DASHBOARD);
        }
      }
      const user = yield select(selectUserInfo);
      // if (_isEmpty(user) || !user) {
        yield put({ type: ME[REQUEST] });
      // }
      yield put({ type: AUTHENTICATE[SUCCESS], payload: { ...token, time: loginTime } });
    } else {
      REMOVE_AUTH();
      yield put({ type: AUTHENTICATE[FAILURE] });
    }
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

function* handlePasswordResetRequest({ data }) {
  try {
    const apiResponse = yield call(passwordResetRequest, data);
    yield sendPayload(apiResponse, PASSWORD_RESET_REQUEST);
  } catch (e) {
    yield sendPayloadFailure(e, PASSWORD_RESET_REQUEST);
  }
}

function* handlePasswordReset({ data }) {
  try {
    const apiResponse = yield call(passwordReset, data);
    if (isSuccess(apiResponse)) {
      toast.info("Password reset successful")
      yield call(Router.push, ROOT);
    }
    yield sendPayload(apiResponse, PASSWORD_RESET);
  } catch (e) {
    yield sendPayloadFailure(e, PASSWORD_RESET);
  }
}

function* handleActivate({ data }) {
  try {
    const apiResponse = yield call(activate, data);
    if (isSuccess(apiResponse)) {
      toast.info("Verification successful")
      yield call(Router.push, ROOT);
    }
    yield sendPayload(apiResponse, ACTIVATE);
  } catch (e) {
    yield sendPayloadFailure(e, ACTIVATE);
  }
}

function* handleRefresh() {
  try {
    const data = {
      refresh_token: GET_AUTH({}).refresh_token
    }
    const apiResponse = yield call(refresh, data);
    if (isSuccess(apiResponse)) {
      const loginTime = new Date();
      cookie.set('loginTime', loginTime, { domain: config["domain"] || "" });
      yield put({
        type: AUTHENTICATE[REQUEST],
        data: { token: _omit(apiResponse.data.data, ['user_info']), loginTime },
      })
    }
    yield sendPayload(apiResponse, REFRESH);
  } catch (e) {
    yield sendPayloadFailure(e, REFRESH);
  }
}

export const userSaga = {
  watchLogoutUser: takeLatest(LOGOUT[REQUEST], handleLogoutUser),
  watchLogin: takeLatest(LOGIN[REQUEST], handleLogin),
  watchSignup: takeLatest(SIGNUP[REQUEST], handleSignup),
  watchAuthentication: takeLatest(AUTHENTICATE[REQUEST], handleAuthentication),
  watchMe: takeLatest(ME[REQUEST], handleMe),
  watchPasswordResetRequest: takeLatest(PASSWORD_RESET_REQUEST[REQUEST], handlePasswordResetRequest),
  watchPasswordReset: takeLatest(PASSWORD_RESET[REQUEST], handlePasswordReset),
  watchActivate: takeLatest(ACTIVATE[REQUEST], handleActivate),
  watchRefresh: takeLatest(REFRESH[REQUEST], handleRefresh),
}


