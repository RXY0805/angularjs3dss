import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromCompany from '../reducers/company.reducer';

export const getCompanyState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.company
);

export const getTradingEntity = createSelector(
  getCompanyState,
  fromCompany.getTradingEntity
);

export const getCompanyEmail = createSelector(
  getCompanyState,
  fromCompany.getCompanyEmail
);

export const getCompanyABN = createSelector(
  getCompanyState,
  fromCompany.getCompanyABN
);
