import { createSelector } from '@ngrx/store';

import { map, mergeAll } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromProjectContractors from '../reducers/projectContractors.reducer';
import * as fromFiltersSelectors from './filters.selectors';
import * as fromCompanySelectors from './company.selectors';

import { ProjectContractor } from '../../models/projectContractor.model';
import { Company } from '../../models/Company.model';
import { getFilterState } from '../index';

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

export const getAvailableContractors = createSelector(
  getAllProjectContractors,
  fromFiltersSelectors.getFilterState,
  (entities, filterState) => {
    if (filterState.selectedProjectId) {
      return entities
        .filter(x => x.id !== filterState.selectedProjectId)
        .map(x => x.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        })
        .map(result => {
          return result.company;
        });
    }
    return null;
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

export const getSelectedProject = createSelector(
  getContractorsEntities,
  fromFiltersSelectors.getFilterState,
  (entities, filterState) => {
    if (filterState.selectedProjectId) {
      return entities[filterState.selectedProjectId].project;
    }
    return null;
  }
);

export const isDuplicatedEmail = createSelector(
  getAllProjectContractors,
  fromCompanySelectors.getCompanyEmail,
  (entities, email) => {
    if (email && email.length) {
      return entities
        .map(x => x.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        })
        .map(result => {
          return result.company;
        })
        .filter(
          c => c.email.toLowerCase().trim() === email.toLowerCase().trim()
        )
        .map(c => c.id);
    }
    return null;
  }
);

export const getContractorsLoaded = createSelector(
  getContractorState,
  fromProjectContractors.getProjectContractorsLoaded
);

export const getContractorsLoading = createSelector(
  getContractorState,
  fromProjectContractors.getProjectContractorsLoading
);
