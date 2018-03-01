import { Action } from '@ngrx/store';

import {
  ProjectContractor,
  ProjectInvitation
} from '../../models/project-contractor.model';
import { Contractor } from '../../models/contractor.model';

// import { AnyFn } from '@ngrx/store/src/selector';

export const LOAD_PROJECT_CONTRACTORS = '[ProjectContractors] Load Contractors';
export const LOAD_PROJECT_CONTRACTORS_FAIL =
  '[ProjectContractors] Load Contractors Fail';
export const LOAD_PROJECT_CONTRACTORS_SUCCESS =
  '[ProjectContractors] Load Contractors Success';

export const INVITE_EXIST_COMPANIES =
  '[ProjectContractors] Invite Exist Companies';
export const INVITE_EXIST_COMPANIES_SUCCESS =
  '[ProjectContractors] Invite Exist Companies Success';
export const INVITE_EXIST_COMPANIES_FAIL =
  '[ProjectContractors] Invite Exist Companies Fail';

export const INVITE_NEW_COMPANY = '[ProjectContractors] Invite New Company';
export const INVITE_NEW_COMPANY_SUCCESS =
  '[ProjectContractors] Invite New Company Success';
export const INVITE_NEW_COMPANY_FAIL =
  '[ProjectContractors] Invite New Company Fail';

export const SET_CURRENT_CONTRACTOR_ID =
  '[ProjectContractors] Set Current Contractor Id';

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
export class SetCurrentContractorId implements Action {
  readonly type = SET_CURRENT_CONTRACTOR_ID;
  constructor(public payload: number) {}
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

export class InviteExistCompanies implements Action {
  readonly type = INVITE_EXIST_COMPANIES;
  constructor(public payload: ProjectInvitation) {}
}
export class InviteExistCompaniesSuccess implements Action {
  readonly type = INVITE_EXIST_COMPANIES_SUCCESS;
  constructor(public payload: ProjectInvitation) {}
}
export class InviteExistCompaniesFail implements Action {
  readonly type = INVITE_EXIST_COMPANIES_FAIL;
  constructor(public payload: any) {}
}

export class InviteNewCompany implements Action {
  readonly type = INVITE_NEW_COMPANY;
  constructor(public payload: ProjectInvitation) {}
}
export class InviteNewCompanySuccess implements Action {
  readonly type = INVITE_NEW_COMPANY_SUCCESS;
  constructor(public payload: any) {}
}
export class InviteNewCompanyFail implements Action {
  readonly type = INVITE_NEW_COMPANY_FAIL;
  constructor(public payload: any) {}
}

// action types
export type ProjectContractorsAction =
  | LoadProjectContractors
  | LoadProjectContractorsFail
  | LoadProjectContractorsSuccess
  | InviteExistCompanies
  | InviteExistCompaniesFail
  | InviteExistCompaniesSuccess
  | InviteNewCompany
  | InviteNewCompanyFail
  | InviteNewCompanySuccess
  | SetCurrentContractorId
  | UpdateContractor
  | UpdateContractorSuccess
  | UpdateContractorFail;
