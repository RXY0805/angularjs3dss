import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Company } from '../../models/company.model';

import { MatPaginator, MatSort } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

export class CompanyDatabase {
  dataChange: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  private dataStore: {
    contacts: Company[];
  };

  get data(): Company[] {
    return this.dataChange.value;
  }
  // get unique company list
  setData(items: Company[]) {
    if (items && items.length) {
      const uniqueCompanyList = Array.from(
        items.reduce((m, t) => m.set(t.id, t), new Map()).values()
      );

      this.dataChange.next(uniqueCompanyList);
    } else {
      this.dataChange.next(null);
    }
  }

  constructor(items: Observable<Company[]>) {
    items.subscribe(
      res => {
        this.setData(res);
      },
      error => console.log('could not load contacts')
    );
  }
}

export class CompanyDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Company[] = [];

  renderedData: Company[] = [];

  public constructor(
    private _companyDatabase: CompanyDatabase,
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<Company[]> {
    const displayDataChanges = [
      this._companyDatabase.dataChange,
      this._paginator.page,
      this._sort.sortChange,
      this._filterChange
    ];
    // .slice()
    return Observable.merge(...displayDataChanges).map(() => {
      if (this._companyDatabase.data == null) {
        return null;
      }
      this.filteredData = this._companyDatabase.data.filter((item: Company) => {
        const searchStr = (item.name + item.email).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      const sortedData = this.sortData(this.filteredData.slice());
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(
        startIndex,
        this._paginator.pageSize
      );
      return this.renderedData;
    });
  }

  public disconnect(): void {}

  sortData(data: Company[]): Company[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        // case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
