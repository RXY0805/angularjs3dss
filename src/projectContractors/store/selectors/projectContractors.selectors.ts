import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromProjectContractors from '../reducers/projectContractors.reducer';

import { ProjectContractor } from '../../models/projectContractor.model';

export const getProjectContractorState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.projectContractors
);

export const getProjectContractorsEntities = createSelector(
  getProjectContractorState,
  fromProjectContractors.getProjectContractorsEntities
);

export const getSelectedProjectContractor = createSelector(
  getProjectContractorState,
  fromRoot.getRouterState,
  (entities, router): ProjectContractor => {
    // come back later error
    return router.state && entities[router.state.params.id];
  }
);
export const getProjectContractorFilter = createSelector(
  getProjectContractorState,
  fromProjectContractors.getContractorFilter
);

export const getSelectedProjectContractors = createSelector(
  getProjectContractorState,
  getProjectContractorFilter,
  (entities, filter): ProjectContractor => {
    // come back later error
    return entities[filter.selectedProjectId];
  }
);

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

// export const getAllProjects = createSelector(
//   getProjectContractorsEntities,
//   entities => {
//     return Object.keys(entities).map(id => entities[id])
//     .map()
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
