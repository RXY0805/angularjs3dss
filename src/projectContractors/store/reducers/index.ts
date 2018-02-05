import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProjectContractors from './projectContractors.reducer';
import * as fromProjectFilters from './projectFilter.reducer';

export interface ProjectState {
  projectContractors: fromProjectContractors.ProjectContractorState;
  projectFilters: fromProjectFilters.ProjectFilterState;
}

export const reducers: ActionReducerMap<ProjectState> = {
  projectContractors: fromProjectContractors.reducer,
  projectFilters: fromProjectFilters.reducer
};

export const getProjectContractorsState = createFeatureSelector<ProjectState>(
  'projectContractors'
);

export const getProjectFiltersState = createFeatureSelector<ProjectState>(
  'projectFilters'
);
