import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

import {
  ProjectContractor,
  ProjectInvitation
} from '../models/project-contractor.model';
import { Contractor } from '../models/contractor.model';

@Injectable()
export class ProjectContractorsService {
  constructor(private http: HttpClient) {}

  getProjectContractors(): Observable<ProjectContractor[]> {
    return this.http
      .get<ProjectContractor[]>(
        `${environment.dataFolder}/projectContractors.json`
      )
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createInvitation(payload: ProjectInvitation): Observable<ProjectInvitation> {
    return this.http
      .post<ProjectInvitation>(`/api/projectInvitation`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateContractor(payload: Contractor): Observable<Contractor> {
    return this.http
      .put<Contractor>(`/api/contractor/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
