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
    if (filterState.projectId) {
      return entities
        .filter(pc => pc.id === filterState.projectId)
        .map(c => c.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        });
    }
    return null;
  }
);

export const getAllContractors = createSelector(
  getAllProjectContractors,
  entities => {
    return entities
      .filter(x => x)
      .map(c => c.contractors)
      .reduce(function(pre, cur) {
        return pre.concat(cur);
      })
      .filter(x => x.company.id > 0);
    // return null;
  }
);

export const getAllContractorsByProjectId = createSelector(
  getAllProjectContractors,
  fromFiltersSelectors.getFilterState,
  (entities, filterState) => {
    if (filterState.projectId) {
      return entities
        .filter(pc => pc.id === filterState.projectId)
        .map(c => c.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        })
        .filter(x => x.company.id > 0);
    }
    return null;
  }
);

export const getSelectedContractor = createSelector(
  getAllContractors,
  fromRoot.getRouterState,
  (contractors, router): Contractor => {
    const contractorId = router.state && router.state.params.contractorId;

    const result = contractors
      .map(x => x)
      .filter(m => m.id === parseInt(contractorId, 10));

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
    if (filterState.projectId) {
      return entities
        .filter(pc => pc.id === filterState.projectId)
        .map(c => c.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        })
        .filter(x => x.project.auditStatus === !!+filterState.isAuditStatus)
        .filter(x => x.project.onSite === !!+filterState.isOnSite)
        .filter(x => x.project.status.id === filterState.statusId);
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
    if (filterState.projectId) {
      return entities
        .filter(x => x.id !== filterState.projectId)
        .map(x => x.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
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
    if (filterState.projectId) {
      return entities[filterState.projectId].mainProject;
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
