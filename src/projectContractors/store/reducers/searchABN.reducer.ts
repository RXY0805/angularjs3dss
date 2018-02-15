import * as fromSearchABNS from '../actions/searchABN.action';

export interface SearchABNState {
  abn: string;
  searched: boolean;
  searching: boolean;
  companyName: string;
}

export const initialState: SearchABNState = {
  abn: undefined,
  searched: false,
  searching: false,
  companyName: undefined
};

export function reducer(
  state = initialState,
  action: fromSearchABNS.SearchABNAction
): SearchABNState {
  switch (action.type) {
    case fromSearchABNS.SEARCH_ABN: {
      return {
        ...state,
        searching: true
      };
    }

    case fromSearchABNS.SEARCH_ABN_SUCCESS: {
      const result = action.payload;

      return {
        ...state,
        searching: false,
        searched: true,
        companyName: result
      };
    }

    case fromSearchABNS.SEARCH_ABN_FAIL: {
      return {
        ...state,
        searching: false,
        searched: false
      };
    }
  }

  return state;
}

export const getCompanyName = (state: SearchABNState) => state.companyName;
export const getSearchABNSearching = (state: SearchABNState) => state.searching;
export const getSearchABNSearched = (state: SearchABNState) => state.searched;
