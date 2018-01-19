import { Action } from '@ngrx/store';

import { ProjectContractor } from '../../models/projectContractor.model';

export const LOAD_PROJECTCONTRACTORS ='[ProjectContractors] Load Contractors';
export const LOAD_PROJECTCONTRACTORS_FAIL ='[ProjectContractors] Load Contractors Fail';
export const LOAD_PROJECTCONTRACTORS_SUCCESS ='[ProjectContractors] Load Contractors Success';

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

//action types
export type ProjectContractorsAction =
    | LoadProjectContractors
    | LoadProjectContractorsFail
    | LoadProjectContractorsSuccess