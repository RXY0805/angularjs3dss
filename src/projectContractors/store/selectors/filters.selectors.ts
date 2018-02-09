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

// export const getSelectedProjectContractor = createSelector(
//   getProjectContractorState,
//   fromRoot.getRouterState,
//   (entities, router): ProjectContractor => {

//     return router.state && entities[router.state.params.id];
//   }
// );

// export const getSelectedProjectContractors = createSelector(
//   getProjectContractorsEntities,
//   getSelectedProjectId,
//   (entities, projectId) => {
//     if (projectId) {
//       return entities[projectId];
//     } else {
//       return entities[10788];
//     }
//   }
// );
