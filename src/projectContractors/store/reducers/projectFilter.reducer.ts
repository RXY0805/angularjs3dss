import * as fromProjectFilters from '../actions/projectFilter.action';
import { ProjectFilter } from '../../models/projectContractor.model';

export interface ProjectFilterState {
  filter: ProjectFilter;
}

export const initialState: ProjectFilterState = {
  filter: {
    selectedProjectId: undefined,
    selectedStatusId: undefined,
    isAuditStatus: true,
    isOnSite: true
  }
};

export function reducer(
  state = initialState,
  action: fromProjectFilters.ProjectFiltersAction
): ProjectFilterState {
  switch (action.type) {
    case fromProjectFilters.SET_PROJECT_FILTER:
      return {
        ...state,
        filter: action.payload
      };
  }
  return state;
}
