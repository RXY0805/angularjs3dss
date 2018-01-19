import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observalbe/throw';

import { ProjectContractor } from '../models/projectContractor.model';
@Injectable()
export class ProjectContractorsService {
  constructor(private http: HttpClient) {}

  getProjectContractors(): Observable<ProjectContractor[]> {
    return this.http
      .get<ProjectContractor[]>(`assets/data/projectContractors.json`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
