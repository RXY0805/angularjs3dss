import { Contractor, JSONContractor } from '@project-contractors/models';

export interface ProjectFilter {
  statusId: number;
  onSiteStatusId: number;
  auditStatusId: number;
}

export interface ProjectContractor {
  id: number;
  projectName: string;
  contractors: Contractor[];
}

export interface JSONProjectContractor {
  Id: number;
  ProjectName: string;
  Contractors: JSONContractor[];
}
