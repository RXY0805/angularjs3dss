import { Action } from '@ngrx/store';

import {
  Contractor,
  ProjectInvitation,
  ProjectContractor
} from '@project-contractors/models';

// import { AnyFn } from '@ngrx/store/src/selector';

export const LOAD_PROJECT_CONTRACTORS = '[ProjectContractors] Load Contractors';
export const LOAD_PROJECT_CONTRACTORS_FAIL =
  '[ProjectContractors] Load Contractors Fail';
export const LOAD_PROJECT_CONTRACTORS_SUCCESS =
  '[ProjectContractors] Load Contractors Success';
export const SET_CURRENT_PROJECT_ID =
  '[ProjectContractors] Set Current Project Id';
export const CREATE_INVITATION = '[ProjectContractors] Create Invitation';
export const CREATE_INVITATION_SUCCESS =
  '[ProjectContractors] Create Invitation Success';
export const CREATE_INVITATION_FAIL =
  '[ProjectContractors] Create Invitation Fail';

export const UPDATE_CONTRACTOR = '[ProjectContractors] Update Contractor';
export const UPDATE_CONTRACTOR_SUCCESS =
  '[ProjectContractors] Update Contractor Success';
export const UPDATE_CONTRACTOR_FAIL =
  '[ProjectContractors] Update Contractor Fail';

export class LoadProjectContractors implements Action {
  readonly type = LOAD_PROJECT_CONTRACTORS;
}

export class LoadProjectContractorsFail implements Action {
  readonly type = LOAD_PROJECT_CONTRACTORS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProjectContractorsSuccess implements Action {
  readonly type = LOAD_PROJECT_CONTRACTORS_SUCCESS;
  constructor(public payload: ProjectContractor[]) {}
}
export class SetCurrentProjectId implements Action {
  readonly type = SET_CURRENT_PROJECT_ID;
  constructor(public payload: number) {
    // alert(this.payload);
  }
}

export class UpdateContractor implements Action {
  readonly type = UPDATE_CONTRACTOR;
  constructor(public payload: Contractor) {}
}
export class UpdateContractorSuccess implements Action {
  readonly type = UPDATE_CONTRACTOR_SUCCESS;
  constructor(public payload: Contractor) {}
}

export class UpdateContractorFail implements Action {
  readonly type = UPDATE_CONTRACTOR_FAIL;
  constructor(public payload: any) {}
}

export class CreateInvitation implements Action {
  readonly type = CREATE_INVITATION;
  constructor(public payload: ProjectInvitation) {}
}
export class CreateInvitationSuccess implements Action {
  readonly type = CREATE_INVITATION_SUCCESS;
  constructor(public payload: ProjectInvitation) {}
}
export class CreateInvitationFail implements Action {
  readonly type = CREATE_INVITATION_FAIL;
  constructor(public payload: any) {}
}

// action types
export type ProjectContractorsAction =
  | LoadProjectContractors
  | LoadProjectContractorsFail
  | LoadProjectContractorsSuccess
  | SetCurrentProjectId
  | CreateInvitation
  | CreateInvitationFail
  | CreateInvitationSuccess
  | UpdateContractor
  | UpdateContractorSuccess
  | UpdateContractorFail;
