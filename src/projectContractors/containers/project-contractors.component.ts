import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  map,
  switchMap,
  catchError,
  distinct,
  takeUntil
} from 'rxjs/operators';
import * as fromStore from '../store';
import {
  Project,
  Contractor,
  ProjectContractor,
  ProjectFilter
} from '@project-contractors/models';

import { ProjectFilterState } from '../store/reducers/project-filter.reducer';

@Component({
  selector: 'app-project-contractors',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['project-contractors.component.css'],
  templateUrl: './project-contractors.component.html'
})
export class ProjectContractorsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  projectFilter$: Observable<ProjectFilter>;
  projects$: Observable<Project[]>;
  project$: Observable<Project>;
  contractors$: Observable<Contractor[]>;

  isCheckable: boolean;

  constructor(
    private store: Store<fromStore.ProjectContractorsState>,
    private router: Router,
    private actR: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isCheckable = false;

    this.projects$ = this.store
      .select(fromStore.getAllSortedProjects)
      .pipe(takeUntil(this.unsubscribe$));

    this.project$ = this.store
      .select(fromStore.getCurrentProject)
      .pipe(takeUntil(this.unsubscribe$));

    this.projectFilter$ = this.store
      .select(fromStore.getFilterState)
      .pipe(takeUntil(this.unsubscribe$));

    this.store
      .select(fromStore.getCurrentProjectId)
      .filter(id => id === 0)
      .subscribe(id =>
        this.project$.subscribe(p =>
          this.store.dispatch(new fromStore.SetCurrentProjectId(p.id))
        )
      );

    this.contractors$ = this.store
      .select(fromStore.getFilteredContractors)
      .pipe(takeUntil(this.unsubscribe$));
  }

  onFilterChange(projectFilter: ProjectFilter) {
    this.store.dispatch(
      new fromStore.ProjectFiltersUpdatedAction(projectFilter)
    );
  }

  onProjectChange(currentProjectId: number) {
    this.store.dispatch(new fromStore.SetCurrentProjectId(currentProjectId));
  }

  onSendInvitation(projectInvitation) {
    this.store.dispatch(
      // 20180303 remove comment while wep api ready
      // new fromStore.CreateInvitation(projectInvitation)
      new fromStore.CreateInvitationSuccess(projectInvitation)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
