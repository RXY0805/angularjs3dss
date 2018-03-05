export interface Project {
  id?: number;
  mainProjectId?: number;
  name?: string;
  onSite?: boolean;
  auditStatus?: boolean;
  auditDate?: string;
  expiryDate?: string;
  status: ProjectStatus;
  isTerminated?: boolean;
}

export interface ProjectStatus {
  id: number;
  description: string;
}

export const defaultProjectStatus: ProjectStatus = {
  id: 3,
  description: 'For Review'
};

export const defaultProject: Project = {
  mainProjectId: undefined,
  onSite: false,
  auditStatus: false,
  status: defaultProjectStatus,
  isTerminated: false
};
