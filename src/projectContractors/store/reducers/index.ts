import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProjectContractors from './projectContractors.reducer';
import * as fromProjectFilters from './projectFilter.reducer';

export interface ProjectContractorsState {
  contractors: fromProjectContractors.ProjectContractorState;
  filters: fromProjectFilters.ProjectFilterState;
}

export const reducers: ActionReducerMap<ProjectContractorsState> = {
  contractors: fromProjectContractors.reducer,
  filters: fromProjectFilters.reducer
};

export const getProjectContractorsState = createFeatureSelector<
  ProjectContractorsState
>('projectContractors');

// export const getProjectFiltersState = createFeatureSelector<ProjectState>(
//   'projectFilters'
// );
