import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  Project,
  ContractorFilter,
  ProjectFilter
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
  @Input() projects: Project[];
  @Input() projectFilter: ProjectFilter;
  @Output()
  filterChange: EventEmitter<any> = new EventEmitter<{
    any;
  }>();

  statusList = [
    { id: 1, name: 'Accept' },
    { id: 2, name: 'Reject' },
    { id: 3, name: 'For Review' },
    { id: 4, name: 'Required' },
    { id: 5, name: 'NOT Applicable' }
  ];

  constructor() {}

  onFilterChange(filterType) {
    this.filterChange.emit({
      projectFilter: this.projectFilter,
      filterType: filterType
    });
  }
}
