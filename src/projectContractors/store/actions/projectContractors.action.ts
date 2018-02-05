import { Action } from '@ngrx/store';

import { ProjectContractor } from '../../models/projectContractor.model';

export const LOAD_PROJECTCONTRACTORS = '[ProjectContractors] Load Contractors';
export const LOAD_PROJECTCONTRACTORS_FAIL =
  '[ProjectContractors] Load Contractors Fail';
export const LOAD_PROJECTCONTRACTORS_SUCCESS =
  '[ProjectContractors] Load Contractors Success';

export const SET_CURRENT_PROJECT_ID =
  '[ProjectContractors] Set Current Project Id';

export class LoadProjectContractors implements Action {
  readonly type = LOAD_PROJECTCONTRACTORS;
}

export class LoadProjectContractorsFail implements Action {
  readonly type = LOAD_PROJECTCONTRACTORS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProjectContractorsSuccess implements Action {
  readonly type = LOAD_PROJECTCONTRACTORS_SUCCESS;
  constructor(public payload: ProjectContractor[]) {}
}
export class SetCurrentProjectId implements Action {
  readonly type = SET_CURRENT_PROJECT_ID;
  constructor(public payload: number) {}
}
// action types
export type ProjectContractorsAction =
  | LoadProjectContractors
  | LoadProjectContractorsFail
  | LoadProjectContractorsSuccess
  | SetCurrentProjectId;
