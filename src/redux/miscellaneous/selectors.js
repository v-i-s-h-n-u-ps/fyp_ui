import { createSelector } from "reselect";
import _get from "lodash/get";

export const selectMisc = state => state.miscellaneous;

export const selectNewChat = createSelector(
    [selectMisc],
    val => _get(val, 'chat.data', {})
)
