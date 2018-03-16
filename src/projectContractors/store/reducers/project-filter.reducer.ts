import * as fromProjectFilters from '../actions/project-filters.action';
import { ProjectFilter } from '@project-contractors/models';

export interface ProjectFilterState {
  statusId: number;
  onSiteStatusId: number;
  auditStatusId: number;
}

export const initialState: ProjectFilterState = {
  statusId: -1,
  onSiteStatusId: -1,
  auditStatusId: -1
};

export function reducer(
  state = initialState,
  action: fromProjectFilters.ProjectFiltersAction
): ProjectFilterState {
  switch (action.type) {
    case fromProjectFilters.PROFECT_FILTERS_UPDATED:
      // console.log('reducer recieved payload', action.payload);
      return {
        ...state,
        statusId: action.payload.statusId,
        auditStatusId: action.payload.auditStatusId,
        onSiteStatusId: action.payload.onSiteStatusId
      };
  }
  return state;
}

export const getProjectFilter = (state: ProjectFilterState) => state;
export const getAuditStatusId = (state: ProjectFilterState) =>
  state.auditStatusId;
export const getOnSiteStatusId = (state: ProjectFilterState) =>
  state.onSiteStatusId;
export const getStatusId = (state: ProjectFilterState) => state.statusId;
