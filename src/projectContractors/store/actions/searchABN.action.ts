import { Action } from '@ngrx/store';

export const SEARCH_ABN = '[ABN] Search';
export const SEARCH_ABN_SUCCESS = '[ABN] Search Success';
export const SEARCH_ABN_FAIL = '[ABN] Search Fail';

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

// action types
export type SearchABNAction = SearchABN | SearchABNSuccess | SearchABNFail;
