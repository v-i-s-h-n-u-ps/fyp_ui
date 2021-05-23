import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

import { refresh, logout } from './user/actions';

const refreshMiddleware = () => {
    const postponedCalls = [];
    dayjs.extend(duration);
    dayjs.extend(relativeTime);
    return ({ dispatch, getState }) => next => action => {
        const token = _get(getState(), 'users.auth.token', {});
        const isAuthenticating = _get(getState(), 'users.auth.isAuthenticating', false);
        const isAuthenticated = _get(getState(), 'users.auth.isAuthenticated', false);
        const isRefreshing = _get(getState(), 'users.auth.isRefreshing', false);
        if (_get(action, 'type', "").endsWith('_REQUEST') && action.type !== 'AUTHENTICATE_REQUEST' && isAuthenticated) {
            const loggedInTime = token.time;
            const validity = token.expires_in * 1000;
            const difference = dayjs(loggedInTime).diff(dayjs(), 'millisecond');
            const valid = difference + 300000 < validity;
            if (!valid || isAuthenticating || isRefreshing) {
                postponedCalls.push(action);
                if (!(getState().users.auth.isRefreshing) && !valid) {
                    return next(refresh.request());
                } else return;
            }
        } else if (action.type === 'REFRESH_SUCCESS' || action.type === 'AUTHENTICATE_SUCCESS') {
            next(action);
            while (postponedCalls.length) {
                dispatch(postponedCalls.pop());
            }
            return;
        } else if (action.type === 'REFRESH_FAILURE') {
            next(action);
            next(logout.request())
            while (postponedCalls.length) {
                postponedCalls.pop();
            }
            return;
        }
        return next(action);
    }
}

export default refreshMiddleware();
