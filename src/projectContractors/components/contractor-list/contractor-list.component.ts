import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
  Input,
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
  private companyData: Company[] = [];
  displayedColumns = ['select', 'id', 'name', 'email'];
  selection = new SelectionModel<number>(true, []);

  public companyDatabase: CompanyDatabase;
  public dataSource: CompanyDataSource | null;
  public defaultPageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  private paginatorSubscription: Subscription = Subscription.EMPTY;
  private sortSubscription: Subscription = Subscription.EMPTY;
  private query: string;
  // companysTrackByFn = (index: string, company: Company) =>
  //   company.id.toString();

  constructor() {}
  ngOnInit() {
    // this.defaultPageSize = this.isCheckable ? 5:10;

    this.companyDatabase = new CompanyDatabase(this.contractors);
    this.dataSource = new CompanyDataSource(
      this.companyDatabase,
      this.paginator,
      this.sort
    );
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
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
      this.dataSource.filteredData.forEach(data =>
        this.selection.select(data.id)
      );
    } else {
      this.companyDatabase.data.forEach(data => this.selection.select(data.id));
    }
  }
}
