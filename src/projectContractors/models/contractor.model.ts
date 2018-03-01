import { Company } from './company.model';
import { Project } from './project.model';

export interface Contractor {
  // id: number;
  id?: number;
  company: Company;
  project: Project;
}
