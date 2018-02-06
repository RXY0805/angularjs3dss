import { Action } from '@ngrx/store';

//import { ProjectFilter } from '../../models/projectContractor.model';

export const SET_PROJECT_FILTER = '[Project] Set Project Filter';
export const FILTER_BY_PROJECT_ID = '[Project] Filter By Project Id';
export const FILTER_BY_STATUS_ID = '[Project ] Filter By Status Id';
export const FILTER_BY_AUDIT_STATUS = '[Project Filter] Set Audit Status';
export const SET_ON_SITE = '[Project Filter] Set On Site';

export class FilterByProjectId implements Action {
  readonly type = FILTER_BY_PROJECT_ID;
  constructor(public payload: number) {}
}

// action types
export type ProjectFiltersAction = FilterByProjectId;
