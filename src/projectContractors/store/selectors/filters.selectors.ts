import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getFilterState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.filters
);
