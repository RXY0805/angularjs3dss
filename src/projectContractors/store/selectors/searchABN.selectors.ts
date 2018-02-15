import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';

import * as fromSearchABN from '../reducers/searchABN.reducer';

export const getSearchABNState = createSelector(
  fromFeature.getProjectContractorsState,
  (state: fromFeature.ProjectContractorsState) => state.searchABN
);

export const getCompanyName = createSelector(
  getSearchABNState,
  fromSearchABN.getCompanyName
);
