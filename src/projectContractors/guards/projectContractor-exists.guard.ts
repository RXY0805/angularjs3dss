import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { ProjectContractor } from '../models/project-contractor.model';
import { Contractor } from '../models/contractor.model';

@Injectable()
export class ProjectContractorExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.ProjectContractorsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.contractorId, 10);
        return this.hasContractor(id);
      })
    );
  }

  hasContractor(id: number): Observable<boolean> {
    const result = this.store
      .select(fromStore.getAllContractors)
      .map(cs => cs.filter(c => c.id === id)[0])
      .map(x => x && x.id > 0);

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
