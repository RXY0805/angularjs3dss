export interface Contractor {
  contractorId?: number;
  companyId?: number;
  companyName?: string;
  statusId: number;
  onSite: number;
  auditComplete: number;
  licenceExpires?: string;
  auditUserName?: string;
  principalProjectId: number;
  [key: number]: any;
}

export interface ContractorAPIModel {
  PrincipalProjectId: number;
  ContractorCompanyId: number;
  ProjectLinkStatus: number;
  AuditComplete: boolean;
  OnSite: boolean;
}

export interface JSONContractor {
  ChildProjectId: number;
  CompanyId?: number;
  CompanyName?: string;
  ProjectLinkStatus: number;
  OnSite: boolean;
  AuditComplete: boolean;
  LicenceExpires: string;
  AuditUserName: string;
  [key: number]: any;
}

// ProjectLinkStatus = projectLinkStatus;

// AuditUserName = auditUserName;
// ChildProjectId = childProjectId;
// LicenceExpires = licenceExpires;

export const DefaultContractor: Contractor = {
  contractorId: undefined,
  principalProjectId: undefined,
  companyId: undefined,
  companyName: undefined,
  statusId: 3,
  onSite: 0,
  auditComplete: 0
};

export const TerminatedContractor: Contractor = {
  ...DefaultContractor,
  statusId: 5
};

export const InvitedContractor: Contractor = {
  ...DefaultContractor,
  statusId: 6
};
