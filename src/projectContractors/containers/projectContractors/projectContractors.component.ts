import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromStore from '../../store';
import {
  ProjectContractor,
  Project,
  ContractorFilter,
  ProjectFilter
} from '../../models/projectContractor.model';
// import { SetProjectFilter } from '../../store/actions/projectFilter.action';

@Component({
  selector: 'app-project-contractors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['projectContractors.component.css'],
  templateUrl: './projectContractors.component.html'
})
export class ProjectContractorsComponent implements OnInit {
  projectContractors$: Observable<ProjectContractor[]>;
  projects$: Observable<Project[]>;
  selectedProjectContractor$: Observable<ProjectContractor>;

  projectFilter$: ProjectFilter = {
    selectedProjectId: 0,
    selectedStatusId: 1,
    isOnSite: true,
    isAuditStatus: true
  };

  constructor(private store: Store<fromStore.ProjectState>) {}

  ngOnInit() {
    // this.projectContractors$ = this.store.select(
    //   fromStore.getAllProjectContractors
    // );

    this.projects$ = this.store.select(fromStore.getAllProjects);
    // this.selectedProjectContractor$ = this.store.select(
    //   fromStore.getSelectedProjectContractors
    // );
    // this.selectedProjectContractor$ = this.store.select(
    //   fromStore.getSelectedProjectContractors
    // );
  }

  searchContractors(event: ProjectFilter) {
    console.log(event);
    // if (!event.selectedProjectId) {
    //   return;
    // }

    this.store.dispatch(new fromStore.SetProjectFilter(event));
  }
}
