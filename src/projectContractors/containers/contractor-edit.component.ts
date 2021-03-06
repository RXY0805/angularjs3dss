import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Subscription } from 'rxjs/Subscription';
import { takeUntil } from 'rxjs/operators';

import * as fromStore from '../store';

import { Contractor, Company, Project } from '@project-contractors/models';

@Component({
  selector: 'app-contractor-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['contractor-edit.component.css'],
  templateUrl: 'contractor-edit.component.html'
})
export class ContractorEditComponent implements OnInit, OnDestroy {
  contractor$: Observable<Contractor>;
  redirectSub: Subscription;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<fromStore.ProjectContractorsState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionsSubject: ActionsSubject
  ) {}

  ngOnInit() {
    this.contractor$ = this.store
      .select(fromStore.getContractorById)
      .pipe(takeUntil(this.unsubscribe$));

    // If the update effect fires, we check if the current id is the one being updated, and redirect to its details
    this.redirectSub = this.actionsSubject
      .filter(action => action.type === fromStore.UPDATE_CONTRACTOR)
      .filter(
        (action: fromStore.UpdateContractorSuccess) =>
          action.payload.contractorId ===
          parseInt(this.activatedRoute.snapshot.params['contractorId'], 10)
      )
      .subscribe((action: fromStore.UpdateContractorSuccess) =>
        this.router.navigate(['/contractors', action.payload.contractorId])
      );

    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      // this.store.dispatch(new fromStore.LoadContractor(params['contractorId']));
    });
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(contractor) {
    // 20180326 change back later
    this.store.dispatch(new fromStore.UpdateContractorSuccess(contractor));
    // this.store.dispatch(new fromStore.UpdateContractor(contractor));
    this.router.navigate(['/contractors']);
  }
  onCancel() {
    this.router.navigate(['/contractors']);
  }
}
