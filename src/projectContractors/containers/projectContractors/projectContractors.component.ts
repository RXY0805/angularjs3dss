import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromStore from '../../store';
import {
  ProjectContractor,
  Project,
  ContractorFilter
} from '../../models/projectContractor.model';

@Component({
  selector: 'app-project-contractors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['projectContractors.component.css'],
  templateUrl: './projectContractors.component.html'
})
export class ProjectContractorsComponent implements OnInit {
  projectContractors$: Observable<ProjectContractor[]>;
  projects$: Observable<Project[]>;

  contractorFilter$: ContractorFilter = {
    selectedProjectId: 0,
    selectedStatusId: 0,
    isOnSite: true,
    isAuditStatus: true
  };

  constructor(private store: Store<fromStore.ProjectContractorsState>) {}

  ngOnInit() {
    this.projectContractors$ = this.store.select(
      fromStore.getAllProjectContractors
    );

    this.projects$ = this.store.select(fromStore.getAllProjects);
  }
  //get project contractors by project Id
}
