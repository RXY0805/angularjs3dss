import { Company } from './company.model';

export interface ContractorStatus {
  id: number;
  description: string;
}

export interface Contractor {
  // id: number;
  company: Company;
  status: ContractorStatus;
}

export const defaultContractorStatus: ContractorStatus = {
  id: 3,
  description: 'For Review'
};
