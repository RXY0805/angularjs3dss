import { Action } from '@ngrx/store';

import { ProjectFilter } from '../../models/projectContractor.model';

export const SET_PROJECT_FILTER = '[Project] Set Project Filter';

export class SetProjectFilter implements Action {
  readonly type = SET_PROJECT_FILTER;
  constructor(public payload: ProjectFilter) {}
}
// action types
export type ProjectFiltersAction = SetProjectFilter;
