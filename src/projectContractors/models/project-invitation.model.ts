import { Company } from '@project-contractors/models';

export interface ProjectInvitation {
  projectId: number;
  existCompanies?: Company[];
  contactPersonEmailList?: string[];
  email?: string;
}

export interface ProjectInvitationAPIModel {
  principalProjectId: number;
  existCompanyIdList?: number[];
  contactPersonEmailList?: string[];
  email?: string;
}
