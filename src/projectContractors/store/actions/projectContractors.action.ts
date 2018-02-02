import { Action } from '@ngrx/store';

import {
  ProjectContractor,
  ContractorFilter
} from '../../models/projectContractor.model';

export const LOAD_PROJECTCONTRACTORS = '[ProjectContractors] Load Contractors';
export const LOAD_PROJECTCONTRACTORS_FAIL =
  '[ProjectContractors] Load Contractors Fail';
export const LOAD_PROJECTCONTRACTORS_SUCCESS =
  '[ProjectContractors] Load Contractors Success';

export const SET_CONTRACTOR_FILTER =
  '[ProjectContractors] Set Contractor Filter';

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
export class SetContractorFilter implements Action {
  readonly type = SET_CONTRACTOR_FILTER;
  constructor(public payload: ContractorFilter) {}
}
// action types
export type ProjectContractorsAction =
  | LoadProjectContractors
  | LoadProjectContractorsFail
  | LoadProjectContractorsSuccess
  | SetContractorFilter;
