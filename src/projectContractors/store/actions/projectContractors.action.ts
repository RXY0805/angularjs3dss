import { Action } from '@ngrx/store';

import {
  ProjectContractor,
  ProjectInvitation
} from '../../models/projectContractor.model';
import { AnyFn } from '@ngrx/store/src/selector';

export const LOAD_PROJECTCONTRACTORS = '[ProjectContractors] Load Contractors';
export const LOAD_PROJECTCONTRACTORS_FAIL =
  '[ProjectContractors] Load Contractors Fail';
export const LOAD_PROJECTCONTRACTORS_SUCCESS =
  '[ProjectContractors] Load Contractors Success';
export const INVITE_CONTRACTORS = '[ProjectContractors] Invite Contractors';
export const INVITE_CONTRACTORS_SUCCESS =
  '[ProjectContractors] Invite Contractors Success';
export const INVITE_CONTRACTORS_FAIL =
  '[ProjectContractors] Invite Contractors Fail';
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

export class InviteContractors implements Action {
  readonly type = INVITE_CONTRACTORS;
  constructor(public payload: ProjectInvitation) {}
}
export class InviteContractorsSuccess implements Action {
  readonly type = INVITE_CONTRACTORS_SUCCESS;
  constructor(public payload: any) {}
}
export class InviteContractorsFail implements Action {
  readonly type = INVITE_CONTRACTORS_FAIL;
  constructor(public payload: any) {}
}

// action types
export type ProjectContractorsAction =
  | LoadProjectContractors
  | LoadProjectContractorsFail
  | LoadProjectContractorsSuccess
  | InviteContractors
  | InviteContractorsFail
  | InviteContractorsSuccess
  | SetCurrentProjectId;
