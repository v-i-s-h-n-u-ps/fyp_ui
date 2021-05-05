import { createSelector } from "reselect";
import _get from "lodash/get";

export const selectUsers = state => state.resources;

export const selectCategory = createSelector(
    [selectUsers],
    val => _get(val, 'category.data', []),
);

export const selectRoles = createSelector(
    [selectUsers],
    val => _get(val, 'role.data', []),
);

export const selectType = createSelector(
    [selectUsers],
    val => _get(val, 'type.data', []),
);

export const selectUniversity = createSelector(
    [selectUsers],
    val => _get(val, 'university.data', []),
);
