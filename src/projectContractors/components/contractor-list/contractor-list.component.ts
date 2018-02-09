import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { Component, Input, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ProjectContractor } from '../../models/projectContractor.model';

import { Contractor } from '../../models/contractor.model';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styles: ['./contractor-list.component.css']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
// implements OnInit
export class ContractorListComponent {
  @Input() filteredContractors: Company[];

  displayedColumns = ['id', 'name', 'email'];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
  constructor() {
    this.dataSource = new MatTableDataSource(this.filteredContractors);
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
}
