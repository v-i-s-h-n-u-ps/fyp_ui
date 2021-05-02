import { createSelector } from "reselect";
import _get from "lodash/get";

export const selectUsers = state => state.users;

export const selectUserInfo = createSelector(
    [selectUsers],
    val => _get(val, 'auth.userInfo'),
);

export const selectIsFormSubmitting = createSelector(
    [selectUsers],
    val => _get(val, 'auth.isSubmitting'),
);

export const selectIsAuth = createSelector(
    [selectUsers],
    val => _get(val, 'auth.isAuthenticated'),
);

export const selectIsOtpSent = createSelector(
    [selectUsers],
    val => _get(val, 'auth.isOtpSent')
);

export const selectIsRequestSuccess = createSelector(
    [selectUsers],
    val => _get(val, 'auth.requestSuccess')
);

export const selectThemePreference = createSelector(
    [selectUsers],
    val => _get(val, 'themePreference'),
);
