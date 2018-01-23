import { Contractor } from './contractor.model';

export interface ProjectContractorFilter {
  searchText: string;
  selectedProjectId: number;
  selectedStatusId: number;
  isOnSite: boolean;
  isAuditStatus: boolean;
}

export interface ProjectInvitation {
  id?: number;
  projectId: number;
  existContractIds?: string[];
  newContractEmail?: string;
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