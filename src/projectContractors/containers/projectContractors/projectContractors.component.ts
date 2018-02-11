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
import { Contractor } from '../../models/contractor.model';
import { Company } from '../../models/company.model';
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
  filteredContractors$: Observable<Company[]>;
  isCheckable$: true;
  projectFilter$: ProjectFilter = {
    selectedProjectId: 0,
    selectedStatusId: 1,
    isOnSite: true,
    isAuditStatus: true
  };

  constructor(private store: Store<fromStore.ProjectContractorsState>) {
    this.store.dispatch(
      new fromStore.FilterByStatusId(this.projectFilter$.selectedStatusId)
    );
  }

  ngOnInit() {
    this.projects$ = this.store
      .select(fromStore.getAllProjects)
      .map(projects => projects.sort(this.sortProjectByName));
    this.filteredContractors$ = this.store.select(
      fromStore.getContractorsByProjectId
    );
  }

  sortProjectByName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  onFilterChange(event) {
    const filter = event.projectFilter;

    switch (event.filterType) {
      case 'PROJECT_ID':
        this.store.dispatch(
          new fromStore.FilterByProjectId(filter.selectedProjectId)
        );
        break;
      case 'STATUS_ID':
        this.store.dispatch(
          new fromStore.FilterByStatusId(filter.selectedStatusId)
        );
        break;
      case 'AUDIT_STATUS':
        this.store.dispatch(
          new fromStore.FilterByAuditStatus(filter.isAuditStatus)
        );
        break;
      case 'ON_SITE':
        this.store.dispatch(new fromStore.FilterByOnSite(filter.isOnSite));
        break;
    }
  }
}
