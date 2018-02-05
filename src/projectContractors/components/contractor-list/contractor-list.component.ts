import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ProjectContractor } from '../../models/projectContractor.model';

import { Contractor } from '../../models/contractor.model';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styles: ['./contractor-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorListComponent implements OnInit {
  @Input() selectedProjectContractor: ProjectContractor;

  displayedColumns = ['id', 'name', 'email'];
  dataSource: MatTableDataSource<Contractor>;
  hello: string;
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
    this.hello = 'hello list component';
    alert('start list');

    // this.dataSource = new MatTableDataSource(
    //   this.selectedProjectContractor.contractors
    // );
  }
  ngOnInit() {
    // alert('start list');
    // console.log(this.selectedProjectContractor);
    console.log(this.selectedProjectContractor);
  }
}
