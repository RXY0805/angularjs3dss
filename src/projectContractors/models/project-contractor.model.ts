import { Contractor } from './contractor.model';
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

export interface ProjectInvitation {
  id?: number;
  projectId: number;
  existContractIds?: string[];
  email?: string;
  tradingEntity?: TradingEntity;
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
