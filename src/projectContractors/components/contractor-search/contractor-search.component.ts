import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  Project,
  ContractorFilter
} from '../../models/projectContractor.model';
// import {
//   ContractorFilter,
//   Project,
//   ProjectStatus,
//   ProjectOnSiteStatus,
//   AuditStatus
// } from '@app-core/models';

@Component({
  selector: 'app-contractor-search',
  templateUrl: './contractor-search.component.html',
  styles: ['./contractor-search.component.css']
})
export class ContractorSearchComponent {
  //   @Input() contractorFilter: ContractorFilter;
  // @Input() projects: Observable<Project[]>;
  @Input() projects: Project[];
  @Input() contractorFilter: ContractorFilter;
  // selectedProjectId: number;
  // selectedStatusId: number;
  // isOnSite: boolean;
  // isAuditStatus: boolean;

  //   @Input() projectStatus: ProjectStatus[];
  //   @Input() auditStatus: AuditStatus[];
  //   @Input() projectOnSiteStatus: ProjectOnSiteStatus[];

  //   @Input() searching = false;
  //   @Input() error = '';
  //   @Output()
  //     onSearch: EventEmitter<ContractorFilter> = new EventEmitter<
  //       ContractorFilter
  //     >();
  constructor() {}
  selectChange() {
    alert('change project');

    // alert(this.contractorFilter.selectedProjectId);
  }

  triggerFilter() {
    // this.onSearch.emit(this.contractorFilter);
  }
}
