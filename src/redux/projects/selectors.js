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

export const selectIsHomeDataLoading = createSelector(
    [selectProjects],
    val => _get(val, 'dashboardProjects.isLoading', false),
)

export const selectHomeData = createSelector(
    [selectProjects],
    val => _get(val, 'dashboardProjects.data.data', []),
)

export const selectHomePageInfo = createSelector(
    [selectProjects],
    val => _get(val, 'dashboardProjects.data.pageInfo', {}),
)

export const selectProjectDetails = createSelector(
    [selectProjects],
    val =>_get(val, 'projectDetails.data', {})
)

export const selectProjectTasks = createSelector(
    [selectProjects],
    val => _get(val, 'projectTasks.data', [])
)

export const selectProjectTasksIsUpdating = createSelector(
    [selectProjects],
    val => _get(val, 'projectTasks.isLoading', [])
)
