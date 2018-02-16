import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as companyAction from '../actions/company.action';
import * as fromServices from '../../services';

@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private searchABNService: fromServices.SearchABNService
  ) {}

  @Effect()
  loadProjectContractors$ = this.actions$
    .ofType<companyAction.SearchABN>(companyAction.SEARCH_ABN)
    .pipe(
      switchMap(action => {
        return this.searchABNService
          .getCompanyByABN(action.payload)
          .pipe(
            map(result => new companyAction.SearchABNSuccess(result)),
            catchError(error => of(new companyAction.SearchABNFail(error)))
          );
      })
    );
}
