import { Contractor } from './contractor.model';

export interface ContractorFilter {
  selectedProjectId: number;
  selectedStatusId: number;
  isOnSite: boolean;
  isAuditStatus: boolean;
}

export interface ProjectFilter {
  selectedProjectId: number;
  selectedStatusId: number;
  isOnSite: boolean;
  isAuditStatus: boolean;
}

export interface ProjectInvitation {
  id?: number;
  projectId: number;
  existContractIds?: string[];
  newCompanyEmail?: string;
  newCompanyABN?: string;
  newCompanyName?: string;
}
export interface Project {
  id?: number;
  name: string;
}

export interface ProjectContractor {
  id: number;
  project: Project;
  contractors: Contractor[];
}
