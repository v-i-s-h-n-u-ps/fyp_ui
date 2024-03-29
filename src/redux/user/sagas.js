import { takeLatest, call, put, select } from "redux-saga/effects";
import _get from "lodash/get";
import _omit from "lodash/omit";
import _isEmpty from "lodash/isEmpty";
import cookie from 'js-cookie'
import Router from "next/router";
import { toast } from "react-toastify";

import { config } from "@config";
import { REQUEST, SUCCESS, FAILURE, SET } from "../actionCreator";
import {
  sendPayload, sendPayloadFailure, isSuccess, reRoute
} from "../_helpers/helperSaga";
import {
  ROOT, DASHBOARD, PRIVATE_ROUTES, PUBLIC_ROUTES,
  PROFILE
} from "@constants/routes";
import {
  LOGOUT, LOGIN, SIGNUP, AUTHENTICATE, ME, OTP_SEND,
  PASSWORD_RESET, PASSWORD_RESET_REQUEST, ACTIVATE,
  REFRESH, RESEND_OTP, SAVE_STUDENT, UPDATE_STUDENT,
  SEARCH_USERS, UPDATE_USER, GET_USER_PROFILE,
  CHANGE_PASSWORD
} from "./types";
import {
  selectUserInfo, selectTokens
} from "./selectors";
import { REMOVE_AUTH, SET_AUTH } from "@services/auth";
import {
  login, signup, me, passwordResetRequest,
  passwordReset, activate, logout, refresh,
  resendOTP, createStudent, updateStudent,
  searchUsers, updateUser, getUserProfile,
  passwordChange
} from "@services";

function* handleLogoutUser() {
  try {
    const tokens = yield select(selectTokens);
    const data = {
      token: tokens.access_token
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
        const tokens = { token: { ..._omit(apiResponse.data.data, ['user_info']) }, loginTime }
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
    if (_get(token, 'access_token')) {
      SET_AUTH(token);
      yield reRoute(ctx, PUBLIC_ROUTES, DASHBOARD);
      const user = yield select(selectUserInfo);
      if (_isEmpty(user)) yield put({ type: ME[REQUEST] });
      yield put({ type: AUTHENTICATE[SUCCESS], payload: { ...token, time: loginTime } });
    } else {
      REMOVE_AUTH();
      yield reRoute(ctx, PRIVATE_ROUTES, ROOT)
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

function* handlePasswordChange({ data }) {
  try {
    const apiResponse = yield call(passwordChange, data);
    if(!isSuccess(apiResponse)) toast.error(apiResponse.data.message)
    yield sendPayload(apiResponse, CHANGE_PASSWORD);
  } catch (e) {
    yield sendPayloadFailure(e, CHANGE_PASSWORD);
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

function* handleResendOTP({ data }) {
  try {
    const apiResponse = yield call(resendOTP, data);
    yield sendPayload(apiResponse, RESEND_OTP);
  } catch (e) {
    yield sendPayloadFailure(e, RESEND_OTP);
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
    const tokens = yield select(selectTokens);
    const data = {
      refresh_token: tokens.refresh_token
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

function* handleSaveStudent({ data }) {
  try {
    const apiResponse = yield call(createStudent, data);
    if (isSuccess(apiResponse)) {
      yield put({ type: ME[REQUEST] });
    }
    yield sendPayload(apiResponse, SAVE_STUDENT);
  } catch (e) {
    yield sendPayloadFailure(e, SAVE_STUDENT);
  }
}

function* handleUpdateStudent({ data }) {
  try {
    const apiResponse = yield call(updateStudent, data);
    if (isSuccess(apiResponse)) {
      yield put({ type: ME[REQUEST] });
      yield call(Router.push, { pathname: PROFILE, query: { tab: 'details' } });
    }
    yield sendPayload(apiResponse, UPDATE_STUDENT);
  } catch (e) {
    yield sendPayloadFailure(e, UPDATE_STUDENT);
  }
}

function* handleSearchStudent({ data }) {
  try {
    const apiResponse = yield call(searchUsers, data);
    yield sendPayload(apiResponse, SEARCH_USERS);
  } catch (e) {
    yield sendPayloadFailure(e, SEARCH_USERS);
  }
}

function* handleUpdateUser({ data }) {
  try {
    const apiResponse = yield call(updateUser, data);
    if (isSuccess) {
      yield put({ type: ME[REQUEST] });
    }
    yield sendPayload(apiResponse, UPDATE_USER);
  } catch (e) {
    yield sendPayloadFailure(e, UPDATE_USER);
  }
}

function* handleUserProfile({ data }) {
  try {
    const apiResponse = yield call(getUserProfile, data);
    yield sendPayload(apiResponse, GET_USER_PROFILE);
  } catch (e) {
    yield sendPayloadFailure(e, GET_USER_PROFILE);
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
  watchResendOTP: takeLatest(RESEND_OTP[REQUEST], handleResendOTP),
  watchSaveStudent: takeLatest(SAVE_STUDENT[REQUEST], handleSaveStudent),
  watchUpdateStudent: takeLatest(UPDATE_STUDENT[REQUEST], handleUpdateStudent),
  watchSearchStudent: takeLatest(SEARCH_USERS[REQUEST], handleSearchStudent),
  watchUpdateUser: takeLatest(UPDATE_USER[REQUEST], handleUpdateUser),
  watchUserProfile: takeLatest(GET_USER_PROFILE[REQUEST], handleUserProfile),
  watchPasswordChange: takeLatest(CHANGE_PASSWORD[REQUEST], handlePasswordChange),
}


