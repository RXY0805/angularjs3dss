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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  @Input() filteredContractors: Contractor[];

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
    // alert('start list');
    if (this.filteredContractors) {
      this.dataSource = new MatTableDataSource(
        this.filteredContractors.map(x => x.company)
      );
    }
  }
  ngOnInit() {
    // alert('start list');
    // console.log(this.selectedProjectContractor);
    console.log('result here');
  }
}
