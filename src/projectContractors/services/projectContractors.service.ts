import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import 'rxjs/add/observable/throw';
import { ProjectInvitation } from '../models/project-contractor.model';

import { ProjectContractor } from '../models/project-contractor.model';
@Injectable()
export class ProjectContractorsService {
  constructor(private http: HttpClient) {}

  getProjectContractors(): Observable<ProjectContractor[]> {
    return this.http
      .get<ProjectContractor[]>(
        `http://localhost:4200/assets/projectContractors.json`
      )
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
  //Observable the following service method
  inviteExistCompanies(
    projectInvitation: ProjectInvitation
  ): ProjectInvitation {
    return projectInvitation;
    // return this.http.post<ProjectInvitation>(
    //   `http://localhost:4200/api/projectInvitation`,
    //   invitation
    // );
  }
}
