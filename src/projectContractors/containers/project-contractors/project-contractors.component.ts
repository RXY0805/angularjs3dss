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

  projectFilter: ProjectFilter = {
    selectedProjectId: 0,
    selectedStatusId: 0,
    isOnSite: true,
    isAuditStatus: true
  };

  constructor(
    private store: Store<fromStore.ProjectContractorsState>,
    private router: Router,
    private actR: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isCheckable = false;
    this.projects$ = this.store
      .select(fromStore.getAllProjects)
      .map(projects => projects.sort(this.sortProjectByName));
    this.selectedProject$ = this.store.select(fromStore.getSelectedMainProject);
    this.store.select(fromStore.getProjectId).subscribe(id => {
      if (id && id > 0) {
        this.projectFilter.selectedProjectId = id;
      } else {
        this.projects$.subscribe(x => {
          this.projectFilter.selectedProjectId = x[0].id;
        });
      }
      this.store.dispatch(
        new fromStore.FilterByProjectId(this.projectFilter.selectedProjectId)
      );
    });
    this.reloadFilterStatus();
    this.contractors$ = this.store.select(fromStore.getContractorsByFilter);
  }

  reloadFilterStatus() {
    this.store.select(fromStore.getAuditStatus).subscribe(x => {
      this.projectFilter.isAuditStatus = x;
      this.store.dispatch(new fromStore.FilterByAuditStatus(x));
    });
    this.store.select(fromStore.getOnSiteStatus).subscribe(x => {
      this.projectFilter.isOnSite = x;
      this.store.dispatch(new fromStore.FilterByOnSite(x));
    });
    this.store.select(fromStore.getStatusId).subscribe(x => {
      this.projectFilter.selectedStatusId = x;
      this.store.dispatch(new fromStore.FilterByStatusId(x));
    });
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

  onSendInvitation(projectInvitation) {
    this.store.dispatch(
      // 20180303 remove comment while wep api ready
      // new fromStore.CreateInvitation(this.invitation)
      new fromStore.CreateInvitationSuccess(projectInvitation)
    );
  }
}
