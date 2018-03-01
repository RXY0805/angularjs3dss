import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Company } from '../../models/company.model';
import { Contractor } from '../../models/contractor.model';

import { MatPaginator, MatSort } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

export class ContractorDatabase {
  dataChange: BehaviorSubject<Contractor[]> = new BehaviorSubject<Contractor[]>(
    []
  );

  private dataStore: {
    contractors: Contractor[];
  };

  get data(): Contractor[] {
    return this.dataChange.value;
  }
  // get unique company list
  setData(items: Contractor[]) {
    if (items && items.length) {
      const uniqueCompanyList = Array.from(
        items.reduce((m, t) => m.set(t.company.id, t), new Map()).values()
      );

      this.dataChange.next(uniqueCompanyList);
    } else {
      this.dataChange.next(null);
    }
  }

  constructor(items: Observable<Contractor[]>) {
    items.subscribe(
      res => {
        this.setData(res);
      },
      error => console.log('could not load contractors')
    );
  }
}

export class ContractorDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Contractor[] = [];

  renderedData: Contractor[] = [];

  public constructor(
    private _contractorDatabase: ContractorDatabase,
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<Contractor[]> {
    const displayDataChanges = [
      this._contractorDatabase.dataChange,
      this._paginator.page,
      this._sort.sortChange,
      this._filterChange
    ];
    // .slice()
    return Observable.merge(...displayDataChanges).map(() => {
      if (this._contractorDatabase.data == null) {
        return null;
      }
      this.filteredData = this._contractorDatabase.data
        // .slice()
        .filter((item: Contractor) => {
          const searchStr = (
            item.company.name +
            ' ' +
            item.company.email
          ).toLowerCase();
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

  sortData(data: Contractor[]): Contractor[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'company.name':
          [propertyA, propertyB] = [
            a.company.name.toLowerCase(),
            b.company.name.toLowerCase()
          ];
          break;
        case 'company.email':
          [propertyA, propertyB] = [
            a.company.email.toLowerCase(),
            b.company.email.toLowerCase()
          ];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
