import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { ProjectContractor } from '../models/projectContractor.model';

@Injectable()
export class ProjectContractorExistsGuards implements CanActivate {
    constructor(private store: Store<fromStore.ProjectContractorsState>) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => {
                const id= route.params.projectId;
                return this.hasProjectContractor(id);
            })
        )
    }

    hasProjectContractor(id: number): Observable<boolean> {
        return this.store
          .select(fromStore.getProjectContractorsEntities)
          .pipe(
            map((entities: { [key: number]: ProjectContractor }) => !!entities[id]),
            take(1)
          );
      }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getProjectContractorsLoaded).pipe(
          tap(loaded => {
            if (!loaded) {
              this.store.dispatch(new fromStore.LoadProjectContractors());
            }
          }),
          filter(loaded => loaded),
          take(1)
        );
      }

}


