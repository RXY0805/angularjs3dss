import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  ContractorFilter,
  ProjectFilter
} from '../../models/project-contractor.model';
import { Project } from '../../models/project.model';
import { ProjectConstants } from '../../../shared/utility/constants/project-constants.component';

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

  statusList = ProjectConstants.ProjectStatusOptions;

  constructor() {}

  onFilterChange(filterType) {
    this.filterChange.emit({
      projectFilter: this.projectFilter,
      filterType: filterType
    });
  }
}
