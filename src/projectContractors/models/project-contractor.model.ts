import { Contractor } from './contractor.model';
import { Company } from './company.model';
import { Project } from './project.model';
import { TradingEntity } from './trading-entity.model';

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

export interface ProjectContractor {
  id: number;
  mainProject: Project;
  contractors: Contractor[];
}

export interface ProjectInvitation {
  projectId: number;
  existCompanies?: Company[];
  email?: string;
  abn?: string;
  tradingEntity?: TradingEntity;
}
