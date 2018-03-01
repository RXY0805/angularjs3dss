import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError, distinct } from 'rxjs/operators';
import * as fromStore from '../../store';
import {
  ProjectContractor,
  ContractorFilter,
  ProjectFilter
} from '../../models/project-contractor.model';
import { Contractor } from '../../models/contractor.model';
import { Company } from '../../models/company.model';
import { Project } from '../../models/project.model';
// import { SetProjectFilter } from '../../store/actions/projectFilter.action';

@Component({
  selector: 'app-project-contractors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['project-contractors.component.css'],
  templateUrl: './project-contractors.component.html'
})
export class ProjectContractorsComponent implements OnInit {
  projectContractors$: Observable<ProjectContractor[]>;
  projects$: Observable<Project[]>;
  selectedProject$: Observable<Project>;
  contractors$: Observable<Contractor[]>;

  isCheckable: boolean;

  projectFilter$: ProjectFilter = {
    selectedProjectId: 0,
    selectedStatusId: 1,
    isOnSite: true,
    isAuditStatus: true
  };

  constructor(
    private store: Store<fromStore.ProjectContractorsState>,
    private router: Router,
    private actR: ActivatedRoute
  ) {
    this.store.dispatch(
      new fromStore.FilterByStatusId(this.projectFilter$.selectedStatusId)
    );
  }

  ngOnInit() {
    this.isCheckable = false;
    this.projects$ = this.store
      .select(fromStore.getAllProjects)
      .map(projects => projects.sort(this.sortProjectByName));
    this.selectedProject$ = this.store.select(fromStore.getSelectedMainProject);
    this.contractors$ = this.store.select(fromStore.getContractorsByFilter);
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

  onEditContractor(id) {
    this.store.dispatch(new fromStore.SetCurrentContractorId(id));
    this.router.navigate(['/contractors', id]);
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
