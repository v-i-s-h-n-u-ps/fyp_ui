import { createSelector } from "reselect";
import _get from "lodash/get";

export const selectUsers = state => state.users;

export const selectUserInfo = createSelector(
    [selectUsers],
    val => _get(val, 'auth.user.user_info'),
);

export const selectStudentInfo = createSelector(
    [selectUsers],
    val => _get(val, 'auth.user.student', { default: true }),
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

export const selectTokens = createSelector(
    [selectUsers],
    val => _get(val, 'auth.token', {})
)

export const selectIsSavingStudent = createSelector(
    [selectUsers],
    val => _get(val, 'student.isLoading')
)

export const selectSearchResults = createSelector(
    [selectUsers],
    val => _get(val, 'search.data') || []
)

export const selectIsSearching = createSelector(
    [selectUsers],
    val => _get(val, 'search.isLoading')
)

export const selectSignUpError = createSelector(
    [selectUsers],
    val => _get(val, 'auth.signUpError')
)
