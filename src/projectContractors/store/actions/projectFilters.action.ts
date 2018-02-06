import { Action } from '@ngrx/store';

export const FILTER_BY_PROJECT_ID = '[Project] Filter By Project Id';
export const FILTER_BY_STATUS_ID = '[Project] Filter By Status Id';
export const FILTER_BY_AUDIT_STATUS = '[Project] Filter By Audit Status';
export const FILTER_BY_ON_SITE = '[Project] Filter By On Site';

export class FilterByProjectId implements Action {
  readonly type = FILTER_BY_PROJECT_ID;
  constructor(public payload: number) {}
}
export class FilterByStatusId implements Action {
  readonly type = FILTER_BY_STATUS_ID;
  constructor(public payload: number) {}
}
export class FilterByAuditStatus implements Action {
  readonly type = FILTER_BY_AUDIT_STATUS;
  constructor(public payload: boolean) {}
}
export class FilterByOnSite implements Action {
  readonly type = FILTER_BY_ON_SITE;
  constructor(public payload: boolean) {}
}
// action types
export type ProjectFiltersAction =
  | FilterByProjectId
  | FilterByStatusId
  | FilterByAuditStatus
  | FilterByOnSite;
