import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromProjectContractors from '../reducers/projectContractors.reducer';

import { ProjectContractor } from '../../models/projectContractor.model';

export const getProjectContractorState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectState) => state.projectContractors
);

export const getProjectFilterState = createSelector(
  fromFeature.getProjectFiltersState,
  (state: fromFeature.ProjectState) => state.projectFilters
);

export const getProjectContractorsEntities = createSelector(
  getProjectContractorState,
  fromProjectContractors.getProjectContractorsEntities
);

// export const getSelectedProjectContractor = createSelector(
//   getProjectContractorState,
//   fromRoot.getRouterState,
//   (entities, router): ProjectContractor => {

//     return router.state && entities[router.state.params.id];
//   }
// );
// export const getSelectedProjectId = createSelector(
//   getProjectContractorState,
//   fromProjectContractors.getCurrentProjectId
// );

export const getAllProjectContractors = createSelector(
  getProjectContractorsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

export const getAllProjects = createSelector(
  getProjectContractorsEntities,
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

export const getProjectContractorsLoaded = createSelector(
  getProjectContractorState,
  fromProjectContractors.getProjectContractorsLoaded
);
export const getProjectContractorsLoading = createSelector(
  getProjectContractorState,
  fromProjectContractors.getProjectContractorsLoading
);
