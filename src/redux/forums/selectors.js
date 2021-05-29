import { createSelector } from "reselect";
import _get from "lodash/get";

export const selectDiscussions = state => state.forums;

export const selectForums = createSelector(
    [selectDiscussions],
    val => _get(val, 'forums.data', [])
)

export const selectForumDetails = createSelector(
    [selectDiscussions],
    val => _get(val, 'forums.details', [])
)

export const selectIsForumSubmitting = createSelector(
    [selectDiscussions],
    val => _get(val, 'manageForums.isLoading', false)
)

export const selectIsLoadingForum = createSelector(
    [selectDiscussions],
    val => _get(val, 'forums.isLoading', false)
)
