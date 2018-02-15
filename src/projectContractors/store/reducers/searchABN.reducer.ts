import * as fromSearchABNS from '../actions/searchABN.action';
import { TradingEntity } from '../../models/tradingEntity.model';

export interface SearchABNState {
  abn: string;
  searched: boolean;
  searching: boolean;
  tradingEntity: TradingEntity;
}

export const initialState: SearchABNState = {
  abn: undefined,
  searched: false,
  searching: false,
  tradingEntity: undefined
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
      console.log(result);
      return {
        ...state,
        searching: false,
        searched: true,
        tradingEntity: result
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

export const getTradingEntity = (state: SearchABNState) => state.tradingEntity;
export const getSearchABNSearching = (state: SearchABNState) => state.searching;
export const getSearchABNSearched = (state: SearchABNState) => state.searched;
