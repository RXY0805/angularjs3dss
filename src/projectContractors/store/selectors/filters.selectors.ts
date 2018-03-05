import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';

import * as fromFilters from '../reducers/project-filter.reducer';

export const getFilterState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.filters
);

export const getProjectId = createSelector(
  getFilterState,
  fromFilters.getProjectId
);

export const getAuditStatus = createSelector(
  getFilterState,
  fromFilters.getAuditStatus
);

export const getOnSiteStatus = createSelector(
  getFilterState,
  fromFilters.getOnSiteStatus
);

export const getStatusId = createSelector(
  getFilterState,
  fromFilters.getStatusId
);
