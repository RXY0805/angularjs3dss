import * as fromProjectFilters from '../actions/projectFilters.action';
import { ProjectFilter } from '../../models/projectContractor.model';

export interface ProjectFilterState {
  filter: ProjectFilter;
}

export const initialState: ProjectFilterState = {
  filter: {
    selectedProjectId: undefined,
    selectedStatusId: undefined,
    isOnSite: true,
    isAuditStatus: true
  }
};

export function reducer(
  state = initialState,
  action: fromProjectFilters.ProjectFiltersAction
): ProjectFilterState {
  if (action.payload) {
    alert('filter reducer' + action.payload.selectedProjectId);
  }

  switch (action.type) {
    case fromProjectFilters.SET_PROJECT_FILTER:
      // alert(action.payload.selectedProjectId);
      return {
        ...state,
        filter: action.payload
      };
  }
  return state;
}

export const getProjectFilter = (state: ProjectFilterState) => state.filter;
