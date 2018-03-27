import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as projectContractorActions from '../actions/project-contractors.action';
import * as fromServices from '../../services';

@Injectable()
export class ProjectContractorsEffects {
  constructor(
    private actions$: Actions,
    private projectContractorService: fromServices.ProjectContractorsService
  ) {}

  @Effect()
  loadProjectContractors$ = this.actions$
    .ofType(projectContractorActions.LOAD_PROJECT_CONTRACTORS)
    .pipe(
      switchMap(() => {
        return this.projectContractorService
          .getProjectContractors()
          .pipe(
            map(
              projectContractors =>
                new projectContractorActions.LoadProjectContractorsSuccess(
                  projectContractors
                )
            ),
            catchError(error =>
              of(new projectContractorActions.LoadProjectContractorsFail(error))
            )
          );
      })
    );
  @Effect()
  updateContractor$ = this.actions$
    .ofType(projectContractorActions.UPDATE_CONTRACTOR)
    .pipe(
      switchMap((action: projectContractorActions.UpdateContractor) => {
        return this.projectContractorService
          .updateContractor(action.payload)
          .pipe(
            map(
              contractor =>
                new projectContractorActions.UpdateContractorSuccess(
                  action.payload
                )
            ),
            catchError(error =>
              of(new projectContractorActions.UpdateContractorFail(error))
            )
          );
      })
    );
  @Effect()
  createInvitation$ = this.actions$
    .ofType(projectContractorActions.CREATE_INVITATION)
    .pipe(
      switchMap((action: projectContractorActions.CreateInvitation) => {
        return this.projectContractorService
          .createInvitation(action.payload)
          .pipe(
            map(
              projectInvitation =>
                new projectContractorActions.CreateInvitationSuccess(
                  projectInvitation
                )
            ),
            catchError(error =>
              of(new projectContractorActions.CreateInvitationFail(error))
            )
          );
      })
    );
}
