import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProjectContractors from './projectContractors.reducer';
import * as fromProjectFilters from './projectFilter.reducer';
import * as fromCompany from './company.reducer';

export interface ProjectContractorsState {
  contractors: fromProjectContractors.ProjectContractorState;
  filters: fromProjectFilters.ProjectFilterState;
  company: fromCompany.CompanyState;
}

export const reducers: ActionReducerMap<ProjectContractorsState> = {
  contractors: fromProjectContractors.reducer,
  filters: fromProjectFilters.reducer,
  company: fromCompany.reducer
};

export const getProjectContractorsState = createFeatureSelector<
  ProjectContractorsState
>('projectContractors');

// export const getProjectFiltersState = createFeatureSelector<ProjectState>(
//   'projectFilters'
// );
