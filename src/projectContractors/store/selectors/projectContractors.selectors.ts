import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromProjectContractors from '../reducers/projectContractors.reducer';
import * as fromFiltersSelectors from './filters.selectors';

import { ProjectContractor } from '../../models/projectContractor.model';

export const getContractorState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.contractors
);

export const getContractorsEntities = createSelector(
  getContractorState,
  fromProjectContractors.getProjectContractorsEntities
);

export const getContractorsByProjectId = createSelector(
  getContractorsEntities,
  fromFiltersSelectors.getFilterState,
  (entities, filterState) => {
    if (filterState.selectedProjectId) {
      return entities[filterState.selectedProjectId].contractors
        .filter(x => x.company.auditStatus === !!+filterState.isAuditStatus)
        .filter(x => x.company.onSite === !!+filterState.isOnSite)
        .filter(x => x.status.id === filterState.selectedStatusId)
        .map(c => c.company);
    }
    return null;
  }
);

export const getAllProjectContractors = createSelector(
  getContractorsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

export const getAllProjects = createSelector(
  getContractorsEntities,
  entities => {
    return Object.keys(entities)
      .map(id => entities[id])
      .map(x => x.project);
  }
);

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

export const getContractorsLoaded = createSelector(
  getContractorState,
  fromProjectContractors.getProjectContractorsLoaded
);
export const getContractorsLoading = createSelector(
  getContractorState,
  fromProjectContractors.getProjectContractorsLoading
);
