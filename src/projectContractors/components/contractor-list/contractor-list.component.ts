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
import { Contractor } from '../../models/contractor.model';
import { Company } from '../../models/company.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinct';
import { Subscription } from 'rxjs/Subscription';
import {
  ContractorDatabase,
  ContractorDataSource
} from './contractor.datasource';
import { DateUtilities } from '../../../shared/utility/date-utility';
import { environment } from '../../../environments/environment';
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
  toggleSelectedCompanies: EventEmitter<any> = new EventEmitter<{
    any;
  }>();
  @Output()
  editContractor: EventEmitter<any> = new EventEmitter<{
    any;
  }>();
  private currentDate: string;
  private companyData: Company[] = [];
  displayedColumns: string[];
  selection = new SelectionModel<number>(true, []);

  onsiteOptions = [
    { name: 'On Site', value: true },
    { name: 'Off Site', value: false }
  ];

  auditStatusOptions = [
    { name: 'OK', value: true },
    { name: 'For review', value: false }
  ];
  public contractorDatabase: ContractorDatabase;
  public dataSource: ContractorDataSource | null;
  public defaultPageSize: number;
  public selectedCompanies: Company[] = [];
  public dataLength: number;
  currentFilter: string;
  baseUrl: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  // companysTrackByFn = (index: string, company: Company) =>
  //   company.id.toString();

  constructor() {}
  ngOnInit() {
    if (this.isCheckable) {
      this.displayedColumns = [
        'select',
        'company.name',
        'company.email',
        'company.id',
        'id'
      ];
    } else {
      this.displayedColumns = [
        // 'select',

        'company.name',
        // 'project.auditStatus',
        'company.email',
        // 'project.onSite',
        'project.auditDate',
        'project.expiryDate',
        'id'
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
          const searchContent = (
            item.company.name + item.company.email
          ).toLowerCase();
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
    } else if (this.filter.nativeElement.value) {
      this.dataSource.filteredData.forEach(data => {
        this.selection.select(data.company.id);
        this.onToggleSelectedCompanies(data.company.id, data.company.name);
      });
    } else {
      this.contractorDatabase.data.forEach(data => {
        this.selection.select(data.company.id);
        this.onToggleSelectedCompanies(data.company.id, data.company.name);
      });
    }
  }
  onEditContractor(id) {
    this.editContractor.emit(id);
  }
  onToggleSelectedCompanies(id, name) {
    let index = -1;

    if (this.selectedCompanies) {
      index = this.selectedCompanies
        .map(function(c) {
          return c.id;
        })
        .indexOf(id);
    }

    if (index < 0) {
      const company: Company = {
        id: id,
        name: name
      };
      this.selectedCompanies.push(company);
    } else {
      this.selectedCompanies.splice(index, 1);
    }
    this.toggleSelectedCompanies.emit(this.selectedCompanies);
  }
}
