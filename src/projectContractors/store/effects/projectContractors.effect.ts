import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs/Observable/of';

import * as projectContractorActions from '../actions/projectContractors.action';
import * as fromServices from '../../services';

@Injectable()
export class ProjectContractorsEffects {
  constructor(
    private actions$: Actions,
    private projectContractorService: fromServices.ProjectContractorsService
  ) {}

  @Effect()
  loadProjectContractors$ = this.actions$
    .ofType(projectContractorActions.LOAD_PROJECTCONTRACTORS)
    .pipe(
      switchMap(() => {
        return this.projectContractorService.getProjectContractors().pipe(
          map(
            projectContractors =>
              new projectContractorActions.LoadProjectContractorsSuccess(
                projectContractors
              )
          )
          // catchError((error:any) => {

          //   // return Observable.empty();
          //   // Observable.of(
          //   //   new projectContractorActions.LoadProjectContractorsFail(error)
          //   // );
          // })
        );
      })
    );
}
