import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  map,
  debounceTime,
  catchError,
  distinctUntilChanged,
  takeUntil
} from 'rxjs/operators';
import * as fromModels from 'projectContractors/models';
import { ProjectConstants } from '@shared-utility/constants';
import { Project, ProjectFilter } from '@project-contractors/models';

@Component({
  selector: 'app-contractor-search',
  templateUrl: './contractor-search.component.html',
  styles: ['./contractor-search.component.css']
})
export class ContractorSearchComponent implements OnInit, OnDestroy {
  @Input() projects: Observable<Project[]>;
  @Input() projectFilter: Observable<ProjectFilter>;

  @Output()
  filterChange: EventEmitter<ProjectFilter> = new EventEmitter<ProjectFilter>();
  @Output() projectChange: EventEmitter<number> = new EventEmitter<number>();
  private unsubscribe$: Subject<void> = new Subject<void>();
  filter: ProjectFilter;
  currentProjectId: number;
  allProjects: Project[];

  statusList = ProjectConstants.ProjectStatusOptionsIncludeAll;

  onSiteStatusList = ProjectConstants.OnSiteStatusOptionsIncludeAll;

  auditStatusList = ProjectConstants.AuditStatusOptionsIncludeAll;

  ngOnInit() {
    this.projects.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      this.allProjects = x;
      this.currentProjectId = this.allProjects[0].id;
    });

    this.projectFilter.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
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
    this.projectChange.emit(this.currentProjectId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
