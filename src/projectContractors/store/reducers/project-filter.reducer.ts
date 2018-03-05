import * as fromProjectFilters from '../actions/project-filters.action';
import { ProjectFilter } from '../../models/project-contractor.model';

export interface ProjectFilterState {
  projectId: number;
  statusId: number;
  isOnSite: boolean;
  isAuditStatus: boolean;
}

export const initialState: ProjectFilterState = {
  projectId: undefined,
  statusId: 1,
  isOnSite: true,
  isAuditStatus: true
};

export function reducer(
  state = initialState,
  action: fromProjectFilters.ProjectFiltersAction
): ProjectFilterState {
  switch (action.type) {
    case fromProjectFilters.FILTER_BY_PROJECT_ID:
      return {
        ...state,
        projectId: action.payload
      };
    case fromProjectFilters.FILTER_BY_STATUS_ID: {
      return {
        ...state,
        statusId: action.payload
      };
    }

    case fromProjectFilters.FILTER_BY_AUDIT_STATUS:
      return {
        ...state,
        isAuditStatus: action.payload
      };
    case fromProjectFilters.FILTER_BY_ON_SITE:
      return {
        ...state,
        isOnSite: action.payload
      };
  }
  return state;
}

export const getProjectFilter = (state: ProjectFilterState) => state;
export const getProjectId = (state: ProjectFilterState) => state.projectId;
export const getAuditStatus = (state: ProjectFilterState) =>
  state.isAuditStatus;
export const getOnSiteStatus = (state: ProjectFilterState) => state.isOnSite;
export const getStatusId = (state: ProjectFilterState) => state.statusId;
