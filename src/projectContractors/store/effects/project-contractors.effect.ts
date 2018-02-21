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
    .ofType(projectContractorActions.LOAD_PROJECTCONTRACTORS)
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

  // @Effect()
  // inviteExistCompanies$ = this.actions$
  //   .ofType(projectContractorActions.INVITE_EXIST_COMPANIES)
  //   .pipe(
  //     switchMap((action: projectContractorActions.InviteExistCompanies) => {
  //       return this.projectContractorService
  //         .inviteExistCompanies(action.payload)
  //         .pipe(
  //           map(
  //             projectContractors =>
  //               new projectContractorActions.InviteExistCompaniesSuccess(
  //                 projectContractors
  //               )
  //           ),
  //           catchError(error =>
  //             of(new projectContractorActions.InviteExistCompaniesFail(error))
  //           )
  //         );
  //     })
  //   );
}
