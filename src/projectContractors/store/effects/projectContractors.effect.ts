import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/Observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as projectContractorActions from '../actions/projectContractors.action';
import * as fromServices  from '../../services'

@Injectable()
export class ProjectContractorsEffects {
    constructor(
        private actions$: Actions,
        private projectContractorService: fromServices.ProjectContractorsService
    ) {}

    @Effect()
    loadProjectContractors$ = this.actions$.ofType(projectContractorActions.LOAD_PROJECTCONTRACTORS).pipe(
        switchMap(() => {
            return this.projectContractorService
                .getProjectContractors()
                .pipe(
                    map(projectContractors => new projectContractorActions.LoadProjectContractorsSuccess(projectContractors)),
                    catchError(error => of(new projectContractorActions.LoadProjectContractorsFail(error)))
                );
        })
    );

}