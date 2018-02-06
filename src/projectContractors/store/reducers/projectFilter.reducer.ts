import * as fromProjectFilters from '../actions/projectFilters.action';
import { ProjectFilter } from '../../models/projectContractor.model';

export interface ProjectFilterState {
  selectedProjectId: number;
  selectedStatusId: number;
  isOnSite: boolean;
  isAuditStatus: boolean;
}

export const initialState: ProjectFilterState = {
  selectedProjectId: undefined,
  selectedStatusId: undefined,
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
        selectedProjectId: action.payload
      };
  }
  return state;
}

export const getProjectFilter = (state: ProjectFilterState) => state;
