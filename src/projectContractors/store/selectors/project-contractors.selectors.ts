import { createSelector } from '@ngrx/store';

import { mergeAll } from 'rxjs/operators';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromProjectContractors from '../reducers/project-contractors.reducer';
import * as fromFiltersSelectors from './filters.selectors';
import * as fromCompanySelectors from './company.selectors';

import { ProjectContractor } from '../../models/project-contractor.model';
import { Contractor } from '../../models/contractor.model';
import { Company } from '../../models/company.model';
import { Project } from '../../models/project.model';
import { getFilterState } from '../index';

export const getContractorState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.contractors
);

export const getContractorsEntities = createSelector(
  getContractorState,
  fromProjectContractors.getProjectContractorsEntities
);

export const getAllProjectContractors = createSelector(
  getContractorsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

export const getAllCompaniesByProjectId = createSelector(
  getAllProjectContractors,
  fromFiltersSelectors.getFilterState,
  (entities, filterState) => {
    if (filterState.selectedProjectId) {
      return entities
        .filter(pc => pc.id === filterState.selectedProjectId)
        .map(c => c.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        })
        .map(y => {
          return y.contractor;
        });
      // .map(x => x.company);
    }
    return null;
  }
);
export const getAllContractorsByProjectId = createSelector(
  getAllProjectContractors,
  fromFiltersSelectors.getFilterState,
  (entities, filterState) => {
    if (filterState.selectedProjectId) {
      return entities
        .filter(pc => pc.id === filterState.selectedProjectId)
        .map(c => c.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        })
        .map(y => y.contractor)
        .filter(x => x.company.id > 0);
    }
    return null;
  }
);

export const getCurrentContractorId = createSelector(
  getContractorState,
  fromProjectContractors.getCurrentContractorId
);

export const getSelectedContractor = createSelector(
  getAllContractorsByProjectId,
  getCurrentContractorId,
  (contractors, selectedContractorId): Contractor => {
    const result = contractors
      .map(x => x)
      .filter(m => m.id === selectedContractorId);
    if (result && result.length) {
      return result[0];
    }
    return null;
  }
);

export const getContractorsByFilter = createSelector(
  getAllProjectContractors,
  fromFiltersSelectors.getFilterState,
  (entities, filterState) => {
    if (filterState.selectedProjectId) {
      return entities
        .filter(pc => pc.id === filterState.selectedProjectId)
        .map(c => c.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        })
        .map(y => y.contractor)
        .filter(x => x.project.auditStatus === !!+filterState.isAuditStatus)
        .filter(x => x.project.onSite === !!+filterState.isOnSite)
        .filter(x => x.project.status.id === filterState.selectedStatusId);
    }
    return null;
  }
);

export const getAllCompaniesIdByProjectId = createSelector(
  getAllContractorsByProjectId,
  c => {
    return c.map(x => x.company.id) || null;
  }
);

export const getUnassignedContractorsByProjectId = createSelector(
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
          return result.contractor;
        })
        .filter(x => x.id && x.id > 0); // project has been assigned to the contractor
    }
    return null;
  }
);

export const getAvailableContractors = createSelector(
  getUnassignedContractorsByProjectId,
  getAllCompaniesIdByProjectId,
  (unassignedContractors, assignedCompaniesId) => {
    return unassignedContractors.filter(function(c) {
      return assignedCompaniesId.indexOf(c.company.id) < 0;
    });
  }
);

export const getAllProjects = createSelector(
  getContractorsEntities,
  entities => {
    return Object.keys(entities)
      .map(id => entities[id])
      .map(x => x.mainProject);
  }
);

export const getSelectedMainProject = createSelector(
  getContractorsEntities,
  fromFiltersSelectors.getFilterState,
  (entities, filterState) => {
    if (filterState.selectedProjectId) {
      return entities[filterState.selectedProjectId].mainProject;
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
