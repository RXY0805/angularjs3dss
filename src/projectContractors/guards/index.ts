import { ProjectContractorsGuard } from './projectContractors.guard';
import { ProjectContractorExistsGuards } from './projectContractor-exists.guard';

export const guards: any[] = [ProjectContractorsGuard, ProjectContractorExistsGuards];

export * from './projectContractors.guard';
export * from './projectContractor-exists.guard';
