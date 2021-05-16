import { createSelector } from "reselect";
import _get from "lodash/get";

import { projectCard } from "@constants/defaults";

export const selectProjects = state => state.projects;

export const selectMyProjects = createSelector(
    [selectProjects],
    val => _get(val, 'myProjects.data', []) || projectCard
)

export const selectIsProjectSubmitting = createSelector(
    [selectProjects],
    val => _get(val, 'manageProject.isLoading', false)
)

export const selectIsLoadingProjects = createSelector(
    [selectProjects],
    val => _get(val, 'myProjects.isLoading', false)
)
