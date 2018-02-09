import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnInit
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Company } from '../../models/company.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
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
  @Input() filteredContractors: Observable<Company[]>;
  private companyData: Company[] = [];
  displayedColumns = ['id', 'name'];
  public companyDatabase: CompanyDatabase;
  public dataSource: CompanyDataSource;
  public defaultPageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  private paginatorSubscription: Subscription = Subscription.EMPTY;
  private sortSubscription: Subscription = Subscription.EMPTY;
  private query: string;
  companysTrackByFn = (index: number, company: Company) => company.id;

  constructor() {}
  ngOnInit() {
    // this.defaultPageSize = this.isCheckable ? 5:10;
    this.displayedColumns = ['id', 'name', 'email'];
    this.companyDatabase = new CompanyDatabase(this.filteredContractors);
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
}
