import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { Contractor, ProjectContractor } from '@project-contractors/models';

@Injectable()
export class ProjectContractorExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.ProjectContractorsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const contractorId = parseInt(route.params.contractorId, 10);
        return this.hasContractor(contractorId);
      })
    );
  }

  hasContractor(contractorId: number): Observable<boolean> {
    const result = this.store
      .select(fromStore.getAllContractors)
      .map(cs => cs.filter(c => c.contractorId === contractorId)[0])
      .map(x => x && x.contractorId > 0);

    return result;
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getContractorsLoaded).pipe(
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
