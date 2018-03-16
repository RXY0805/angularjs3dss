import { Action } from '@ngrx/store';
import { ProjectFilter } from '../../models/project-contractor.model';

export const PROFECT_FILTERS_UPDATED = '[ProjectFilters] Filters updated';

export class ProjectFiltersUpdatedAction implements Action {
  readonly type = PROFECT_FILTERS_UPDATED;
  constructor(public payload: ProjectFilter) {}
}
// action types
export type ProjectFiltersAction =
  | ProjectFiltersUpdatedAction;
