import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as searchABNAction from '../actions/searchABN.action';
import * as fromServices from '../../services';

@Injectable()
export class SearchABNEffects {
  constructor(
    private actions$: Actions,
    private searchABNService: fromServices.SearchABNService
  ) {}

  @Effect()
  loadProjectContractors$ = this.actions$
    .ofType<searchABNAction.SearchABN>(searchABNAction.SEARCH_ABN)
    .pipe(
      switchMap(action => {
        return this.searchABNService
          .getCompanyByABN(action.payload)
          .pipe(
            map(result => new searchABNAction.SearchABNSuccess(result)),
            catchError(error => of(new searchABNAction.SearchABNFail(error)))
          );
      })
    );
}
