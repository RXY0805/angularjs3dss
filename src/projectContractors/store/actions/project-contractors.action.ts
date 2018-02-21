import { Action } from '@ngrx/store';

import {
  ProjectContractor,
  ProjectInvitation
} from '../../models/project-contractor.model';

// import { AnyFn } from '@ngrx/store/src/selector';

export const LOAD_PROJECTCONTRACTORS = '[ProjectContractors] Load Contractors';
export const LOAD_PROJECTCONTRACTORS_FAIL =
  '[ProjectContractors] Load Contractors Fail';
export const LOAD_PROJECTCONTRACTORS_SUCCESS =
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
  | SetCurrentProjectId;
