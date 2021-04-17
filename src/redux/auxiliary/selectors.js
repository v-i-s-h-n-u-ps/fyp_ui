import { createSelector } from "reselect";
import _get from "lodash/get";

const selectAux = state => state.aux;

export const selectGlobalAPIError = createSelector(
  [selectAux],
  val => _get(val, 'globalAPIError'),
);

export const selectGlobalAPISuccess = createSelector(
  [selectAux],
  val => _get(val, 'globalAPISuccess'),
);

export const selectGlobalModal = createSelector(
  [selectAux],
  val => _get(val, 'globalModal'),
);