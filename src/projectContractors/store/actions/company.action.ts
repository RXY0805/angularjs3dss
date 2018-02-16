import { Action } from '@ngrx/store';

export const SEARCH_ABN = '[Company] Search ABN';
export const SEARCH_ABN_SUCCESS = '[Company] Search ABN Success';
export const SEARCH_ABN_FAIL = '[Company] Search ABN Fail';
export const SET_COMPANY_EMAIL = '[Company] Set Company Email';

export class SearchABN implements Action {
  readonly type = SEARCH_ABN;
  constructor(public payload: string) {}
}
export class SearchABNSuccess implements Action {
  readonly type = SEARCH_ABN_SUCCESS;
  constructor(public payload: any) {}
}

export class SearchABNFail implements Action {
  readonly type = SEARCH_ABN_FAIL;
  constructor(public payload: string) {}
}

export class SetCompanyEmail implements Action {
  readonly type = SET_COMPANY_EMAIL;
  constructor(public payload: string) {}
}
// action types
export type CompanyAction =
  | SearchABN
  | SearchABNSuccess
  | SearchABNFail
  | SetCompanyEmail;
