import { refresh } from './user/actions';

export const refreshMiddleWare = ({ dispatch, getState }) => {

    return (next) => (action) => {

        if (typeof action === 'function') {

            if (getState().auth && getState().auth.token) {

                var tokenExpiration = jwtDecode(getState().auth.token).refreshtoken;

                if (tokenExpiration && (moment(tokenExpiration) - moment(Date.now()) < 5000)) {

                    // make sure we are not already refreshing the token
                    if (!getState().auth.freshTokenPromise) {
                        return refreshToken(dispatch).then(() => next(action));
                    } else {
                        return getState().auth.freshTokenPromise.then(() => next(action));
                    }
                }
            }
        }
        return next(action);
    };
}