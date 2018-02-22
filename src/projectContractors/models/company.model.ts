export interface Company {
  id?: number;
  name: string;
  email?: string;
  onSite?: boolean;
  auditStatus?: boolean;
  auditDate?: string;
  expiryDate?: string;
}
