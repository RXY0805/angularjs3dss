import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProjectContractors from './projectContractors.reducer';

export interface ProjectContractorsState {
  projectContractors: fromProjectContractors.ProjectContractorState;
}

export const reducers: ActionReducerMap<ProjectContractorsState> = {
  projectContractors: fromProjectContractors.reducer
};

export const getProjectContractorsState = createFeatureSelector<
  ProjectContractorsState
>('projectContractors');
