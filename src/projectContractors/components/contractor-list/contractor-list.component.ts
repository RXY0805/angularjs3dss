import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  EventEmitter,
  ElementRef,
  Input,
  Output,
  OnInit
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinct';
import { Subscription } from 'rxjs/Subscription';
import {
  ContractorDatabase,
  ContractorDataSource
} from './contractor.datasource';
import {
  Contractor,
  Company,
  TerminatedContractor,
  InvitedContractor
} from '@project-contractors/models';

import { DateUtilities } from '@shared-utility/date';
import { environment } from '../../../environments/environment';
import { ProjectConstants } from '@shared-utility/constants';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-contractor-list',
  templateUrl: 'contractor-list.component.html',
  styleUrls: ['contractor-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorListComponent implements OnInit {
  @Input() contractors: Observable<Contractor[]>;
  @Input() isCheckable: boolean;
  @Output()
  toggleSelectedCompany: EventEmitter<any> = new EventEmitter<{
    any;
  }>();

  private currentDate: string;
  private companyData: Company[] = [];
  displayedColumns: string[];
  selection = new SelectionModel<number>(true, []);

  public contractorDatabase: ContractorDatabase;
  public dataSource: ContractorDataSource | null;
  public defaultPageSize: number;
  public dataLength: number;
  currentFilter: string;
  baseUrl: string;
  terminatedStatusId: number = TerminatedContractor.statusId;
  invitedStatusId: number = InvitedContractor.statusId;

  statusList = ProjectConstants.ProjectStatusOptions;
  onSiteStatusList = ProjectConstants.OnSiteStatusOptions;
  auditStatusList = ProjectConstants.AuditStatusOptions;

  // terminatedStatus: Contractor = terminatedContractor;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  // companysTrackByFn = (index: string, company: Company) =>
  //   company.id.toString();

  constructor() {}
  ngOnInit() {
    if (this.isCheckable) {
      this.displayedColumns = ['select', 'companyName', 'auditUserName'];
    } else {
      this.displayedColumns = [
        'companyName',
        'auditUserName',
        'statusId',
        'onSite',
        'auditComplete',
        'licenceExpires',
        'contractorId'
      ];
    }

    this.baseUrl = environment.baseUrl;
    this.defaultPageSize = this.isCheckable ? 5 : 10;
    this.contractors.subscribe(res => {
      // console.log(res);
      this.contractorDatabase = new ContractorDatabase(this.contractors);

      this.dataSource = new ContractorDataSource(
        this.contractorDatabase,
        this.paginator,
        this.sort
      );
      if (this.currentFilter) {
        this.dataSource.filter = this.currentFilter;
        this.dataLength = res.filter((item: Contractor) => {
          const searchContent = item.companyName
            // + item.company.email
            .toLowerCase();
          return searchContent.indexOf(this.currentFilter.toLowerCase()) !== -1;
        }).length;
      } else {
        this.dataLength =
          this.contractorDatabase.data && this.contractorDatabase.data.length
            ? this.contractorDatabase.data.length
            : 0;
      }
    });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
        this.currentFilter = this.filter.nativeElement.value;
        this.dataLength = this.dataSource.filteredData.length;
      });
  }

  getProjectStatus(statusId) {
    return ProjectConstants.getProjectStatusName(statusId);
  }

  getOnSiteStatus(statusId) {
    return ProjectConstants.getOnSiteStatusName(statusId);
  }

  getAuditStatus(statusId) {
    return ProjectConstants.getAuditStatusName(statusId);
  }

  getColor(expiredDate) {
    return DateUtilities.getExpiredColor(expiredDate);
  }

  isAllSelected(): boolean {
    if (!this.dataSource) {
      return false;
    }
    if (this.selection.isEmpty()) {
      return false;
    }

    if (this.filter.nativeElement.value) {
      return (
        this.selection.selected.length === this.dataSource.filteredData.length
      );
    } else {
      return (
        this.selection.selected.length === this.contractorDatabase.data.length
      );
    }
  }

  masterToggle() {
    if (!this.dataSource) {
      return;
    }

    if (this.isAllSelected()) {
      this.selection.clear();
      this.onToggleSelectedCompany(-1, null, true);
    } else if (this.filter.nativeElement.value) {
      this.dataSource.filteredData.forEach(data => {
        this.toggleSelection(data);
      });
    } else {
      this.contractorDatabase.data.forEach(data => {
        this.toggleSelection(data);
      });
    }
  }

  toggleSelection(data) {
    this.selection.select(data.companyId);

    this.onToggleSelectedCompany(data.companyId, data.companyName, true);
  }

  onToggleSelectedCompany(id, name, isMasterToggle) {
    this.toggleSelectedCompany.emit({
      id: id,
      name: name,
      isMasterToggle: isMasterToggle
    });
  }
}
