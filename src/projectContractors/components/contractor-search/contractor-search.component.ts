import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromModels from 'projectContractors/models';
import { ProjectConstants } from '@shared-utility/constants';
import { Project, ProjectFilter } from '@project-contractors/models';

@Component({
  selector: 'app-contractor-search',
  templateUrl: './contractor-search.component.html',
  styles: ['./contractor-search.component.css']
})
export class ContractorSearchComponent implements OnInit {
  @Input() projects: Observable<Project[]>;
  @Input() projectFilter: Observable<ProjectFilter>;

  @Output()
  filterChange: EventEmitter<ProjectFilter> = new EventEmitter<ProjectFilter>();
  @Output() projectChange: EventEmitter<number> = new EventEmitter<number>();
  filter: ProjectFilter;
  currentProjectId: number;
  allProjects: Project[];

  statusList = ProjectConstants.ProjectStatusOptionsIncludeAll;

  onSiteStatusList = ProjectConstants.OnSiteStatusOptionsIncludeAll;

  auditStatusList = ProjectConstants.AuditStatusOptionsIncludeAll;

  ngOnInit() {
    this.projects.subscribe(x => {
      this.allProjects = x;
      this.currentProjectId = this.allProjects[0].id;
    });
    this.projectFilter.subscribe(x => {
      this.filter = {
        auditStatusId: x.auditStatusId,
        onSiteStatusId: x.onSiteStatusId,
        statusId: x.statusId
      };
    });
  }

  onFilterChange() {
    this.filterChange.emit(this.filter);
  }
  onProjectChange() {
    // alert('project search change'+ this.currentProjectId)
    // console.log(this.currentProjectId);
    this.projectChange.emit(this.currentProjectId);
  }
}
