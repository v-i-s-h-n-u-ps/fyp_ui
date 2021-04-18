import { createSelector } from "reselect";
import {get as _get} from "lodash";

export const selectUsers = state => state.users;

export const selectUserInfo = createSelector(
    [selectUsers],
    val => _get(val, 'auth.userInfo'),
);