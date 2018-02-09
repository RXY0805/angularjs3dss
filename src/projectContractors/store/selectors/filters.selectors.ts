import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';

import * as fromFilters from '../reducers/projectFilter.reducer';

export const getFilterState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.filters
);

export const getSelectedProjectId = createSelector(
  getFilterState,
  fromFilters.getSelectedProjectId
);

export const getAuditStatus = createSelector(
  getFilterState,
  fromFilters.getAuditStatus
);
