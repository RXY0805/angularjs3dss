import { Company } from './company.model';

export interface ContractorStatus {
  id: number;
  description: string;
}

export interface Contractor {
  company: Company;
  status: ContractorStatus;
}
