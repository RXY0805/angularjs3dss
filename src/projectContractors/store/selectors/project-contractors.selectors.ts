import { createSelector } from '@ngrx/store';

import { mergeAll, take } from 'rxjs/operators';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromProjectContractors from '../reducers/project-contractors.reducer';
import * as fromFiltersSelectors from './filters.selectors';
import * as fromCompanySelectors from './company.selectors';

import { Contractor, Project } from '@project-contractors/models';

export const getContractorState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.contractors
);

export const getContractorsEntities = createSelector(
  getContractorState,
  fromProjectContractors.getProjectContractorsEntities
);

export const getCurrentProjectId = createSelector(
  getContractorState,
  fromProjectContractors.getCurrentProjectId
);

export const getAllProjectContractors = createSelector(
  getContractorsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
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
      .filter(x => x.companyId > 0); // new invited company NOT include
  }
);

export const getAllSortedProjects = createSelector(
  getContractorsEntities,
  (entities): Project[] => {
    return Object.keys(entities)
      .map(id => {
        return entities[id];
      })
      .sort(sortProjectByName)
      .map(x => {
        return new Project(x.id, x.projectName);
      });
  }
);

function sortProjectByName(a, b) {
  if (a.projectName < b.projectName) {
    return -1;
  }
  if (a.projectName > b.projectName) {
    return 1;
  }
  return 0;
}

export const getCurrentProject = createSelector(
  getAllSortedProjects,
  getCurrentProjectId,
  (projects, currentProjectId): Project => {
    if (currentProjectId > 0) {
      return projects.filter(p => p.id === currentProjectId)[0];
    }
    return projects[0];
  }
);

export const getAllContractorsByProjectId = createSelector(
  getAllProjectContractors,
  getCurrentProject,
  (entities, project): Contractor[] => {
    return entities
      .filter(pc => pc.id === project.id)
      .map(c => c.contractors)
      .reduce(function(pre, cur) {
        return pre.concat(cur);
      })
      .filter(x => x.companyId && x.companyId > 0);
  }
);

export const getFilteredContractors = createSelector(
  getAllContractorsByProjectId,
  fromFiltersSelectors.getFilterState,
  (contractors, filterState) => {
    if (filterState.auditStatusId > -1) {
      contractors = contractors.filter(
        x => x.auditComplete === filterState.auditStatusId
      );
    }

    if (filterState.onSiteStatusId > -1) {
      contractors = contractors.filter(
        x => x.onSite === filterState.onSiteStatusId
      );
    }

    if (filterState.statusId > -1) {
      contractors = contractors.filter(
        x => x.statusId === filterState.statusId
      );
    }
    return contractors;
  }
);

export const getContractorById = createSelector(
  getAllContractors,
  fromRoot.getRouterState,
  (contractors, router): Contractor => {
    const contractorId = router.state && router.state.params.contractorId;
    const result = contractors
      .map(x => x)
      .filter(m => m.contractorId === parseInt(contractorId, 10));

    if (result && result.length) {
      return result[0];
    }
    return null;
  }
);

export const getAllCompaniesIdByProjectId = createSelector(
  getAllContractorsByProjectId,
  c => {
    return c.map(x => x.companyId) || null;
  }
);

export const getUnassignedContractorsByProjectId = createSelector(
  getAllProjectContractors,
  getCurrentProject,
  (entities, selectedProject) => {
    if (selectedProject.id) {
      return entities
        .filter(x => x.id !== selectedProject.id)
        .map(x => x.contractors)
        .reduce(function(pre, cur) {
          return pre.concat(cur);
        })
        .filter(x => x.companyId && x.companyId > 0); // project has been assigned to the contractor
    }
    return null;
  }
);

export const getAvailableContractors = createSelector(
  getUnassignedContractorsByProjectId,
  getAllCompaniesIdByProjectId,
  (unassignedContractors, assignedCompaniesId) => {
    return unassignedContractors.filter(function(c) {
      return assignedCompaniesId.indexOf(c.companyId) < 0;
    });
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
        .filter(c => {
          if (c.email) {
            return c.email.toLowerCase().trim() === email.toLowerCase().trim();
          }
          return false;
        })
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
