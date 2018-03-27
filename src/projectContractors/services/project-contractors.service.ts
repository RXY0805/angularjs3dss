import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { map, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import {
  ProjectContractor,
  ProjectInvitation,
  ProjectInvitationAPIModel,
  Contractor,
  JSONProjectContractor,
  JSONContractor,
  DefaultContractor,
  ContractorAPIModel
} from '@project-contractors/models';

@Injectable()
export class ProjectContractorsService {
  constructor(private http: HttpClient) {}

  getProjectContractors(): Observable<ProjectContractor[]> {
    return (
      this.http
        // .get<JSONProjectContractor[]>(`/websiteAPI/Contractors`)
        .get<JSONProjectContractor[]>(`${environment.dataFolder}/mirvac.json`)
        .pipe(
          map(convertToProjectContractorModel),
          catchError((error: any) => Observable.throw(error.json()))
        )
    );
  }

  createInvitation(payload: ProjectInvitation): Observable<ProjectInvitation> {
    const projectInvitationAPIModel = convertToProjectInvitationAPIModel(
      payload
    );

    return this.http
      .post<ProjectInvitationAPIModel>(
        `/api/projectInvitation`,
        projectInvitationAPIModel
      )
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateContractor(payload: Contractor): Observable<Contractor> {
    const contractorAPIModel = convertToContractorAPIModel(payload);
    return this.http
      .put<ContractorAPIModel>(`/websiteAPI/Contractors`, contractorAPIModel)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}

function convertToProjectInvitationAPIModel(
  data: ProjectInvitation
): ProjectInvitationAPIModel {
  return {
    principalProjectId: data.projectId,
    existCompanyIdList: data.existCompanies.map(x => x.id),
    email: data.email || ''
  };
}

function convertToContractorAPIModel(data): ContractorAPIModel {
  return {
    PrincipalProjectId: data.principalProjectId,
    ContractorCompanyId: data.companyId,
    ProjectLinkStatus: data.statusId,
    OnSite: data.onSite,
    AuditComplete: data.auditComplete
  };
}

function convertToProjectContractorModel(jsonData): ProjectContractor {
  const result = jsonData.map((x): ProjectContractor => {
    const contractors = x.Contractors.map((c): Contractor => {
      const contractor: Contractor = {
        contractorId: c.ChildProjectId,
        principalProjectId: x.PrincipalProjectId,
        companyId: c.CompanyId,
        companyName: c.CompanyName,
        statusId: c.ProjectLinkStatus,
        onSite: c.OnSite ? 1 : 0,
        auditUserName: c.AuditUserName || '',
        auditComplete: c.AuditComplete ? 1 : 0,
        licenceExpires: c.LicenceExpires || ''
      };
      return contractor;
    });

    return {
      id: x.PrincipalProjectId,
      projectName: x.ProjectName,
      contractors: contractors
    };
  });
  return result;
}
