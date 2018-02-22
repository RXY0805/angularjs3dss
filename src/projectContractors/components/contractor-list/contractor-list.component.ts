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
import { Company } from '../../models/company.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinct';
import { Subscription } from 'rxjs/Subscription';
import { CompanyDatabase, CompanyDataSource } from './company.datasource';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styles: ['./contractor-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorListComponent implements OnInit {
  @Input() contractors: Observable<Company[]>;
  @Input() isCheckable: boolean;
  @Output()
  toggleSelectedCompanies: EventEmitter<any> = new EventEmitter<{
    any;
  }>();

  private companyData: Company[] = [];
  displayedColumns: string[];
  selection = new SelectionModel<number>(true, []);

  public companyDatabase: CompanyDatabase;
  public dataSource: CompanyDataSource | null;
  public defaultPageSize: number;
  public selectedCompanies: Company[] = [];
  public dataLength: number;
  currentFilter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  // private paginatorSubscription: Subscription = Subscription.EMPTY;
  // private sortSubscription: Subscription = Subscription.EMPTY;
  // private query: string;
  // companysTrackByFn = (index: string, company: Company) =>
  //   company.id.toString();

  constructor() {}
  ngOnInit() {
    if (this.isCheckable) {
      this.displayedColumns = ['select', 'id', 'name', 'email'];
    } else {
      this.displayedColumns = [
        'select',
        'id',
        'name',
        'email',
        'auditDate',
        'expiryDate'
      ];
    }
    this.defaultPageSize = this.isCheckable ? 5 : 10;
    this.contractors.subscribe(res => {
      this.companyDatabase = new CompanyDatabase(this.contractors);

      this.dataSource = new CompanyDataSource(
        this.companyDatabase,
        this.paginator,
        this.sort
      );
      if (this.currentFilter) {
        this.dataSource.filter = this.currentFilter;
        this.dataLength = res.filter((item: Company) => {
          const searchContent = (item.name + item.email).toLowerCase();
          return searchContent.indexOf(this.currentFilter.toLowerCase()) !== -1;
        }).length;
      } else {
        this.dataLength =
          this.companyDatabase.data && this.companyDatabase.data.length
            ? this.companyDatabase.data.length
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
        this.selection.selected.length === this.companyDatabase.data.length
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
        this.selection.select(data.id);
        this.onToggleSelectedCompanies(data.id, data.name);
      });
    } else {
      this.companyDatabase.data.forEach(data => {
        this.selection.select(data.id);
        this.onToggleSelectedCompanies(data.id, data.name);
      });
    }
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
        name: name,
        onSite: false,
        auditStatus: false
      };
      this.selectedCompanies.push(company);
    } else {
      this.selectedCompanies.splice(index, 1);
    }
    this.toggleSelectedCompanies.emit(this.selectedCompanies);
  }
}
