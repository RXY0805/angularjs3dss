import { Company } from './company.model';

export interface ContractorStatus {
  id: number;
  description: string;
}

export interface Contractor {
  company: Company;
  status: ContractorStatus;
}

export interface ProjectInvitation {
  projectId: number;
  existCompanies?: Company[];
  email?: string;
  abn?: string;
}

export const defaultContractorStatus: ContractorStatus = {
  id: 3,
  description: 'For Review'
};
