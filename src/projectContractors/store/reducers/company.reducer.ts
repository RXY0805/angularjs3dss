import * as fromCompany from '../actions/company.action';
import { TradingEntity } from '../../models/tradingEntity.model';

export interface CompanyState {
  abn: string;
  searched: boolean;
  searching: boolean;
  tradingEntity: TradingEntity;
  email: string;
}

export const initialState: CompanyState = {
  abn: undefined,
  searched: false,
  searching: false,
  tradingEntity: undefined,
  email: undefined
};

export function reducer(
  state = initialState,
  action: fromCompany.CompanyAction
): CompanyState {
  switch (action.type) {
    case fromCompany.SEARCH_ABN: {
      return {
        ...state,
        abn: action.payload,
        searching: true
      };
    }

    case fromCompany.SEARCH_ABN_SUCCESS: {
      const result = action.payload;
      console.log(result);
      return {
        ...state,
        searching: false,
        searched: true,
        tradingEntity: result
      };
    }

    case fromCompany.SEARCH_ABN_FAIL: {
      return {
        ...state,
        searching: false,
        searched: false
      };
    }
    case fromCompany.SET_COMPANY_EMAIL: {
      return {
        ...state,
        email: action.payload
      };
    }
  }

  return state;
}

export const getTradingEntity = (state: CompanyState) => state.tradingEntity;
export const getSearchABNSearching = (state: CompanyState) => state.searching;
export const getSearchABNSearched = (state: CompanyState) => state.searched;
export const getCompanyEmail = (state: CompanyState) => state.email;
export const getCompanyABN = (state: CompanyState) => state.abn;
