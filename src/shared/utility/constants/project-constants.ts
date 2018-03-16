import { ProjectContractorExistsGuards } from 'projectContractors/guards';

export class DefaultConstants {
  public static AllOption = {
    id: -1,
    name: 'All'
  };
}

export class ProjectConstants {
  public static ProjectStatusEditingOptions = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Declined' },
    { id: 3, name: 'Accepted' },
    { id: 4, name: 'Required' },
    { id: 5, name: 'Terminated' }
  ];

  public static ProjectStatusOptions = [
    ...ProjectConstants.ProjectStatusEditingOptions,
    { id: 6, name: 'Invited' }
  ];

  public static ProjectStatusOptionsIncludeAll = [
    DefaultConstants.AllOption,
    ...ProjectConstants.ProjectStatusOptions
  ];

  public static OnSiteStatusOptions = [
    { id: 1, name: 'On Site' },
    { id: 0, name: 'Off Site' }
  ];

  public static OnSiteStatusOptionsIncludeAll = [
    DefaultConstants.AllOption,
    ...ProjectConstants.OnSiteStatusOptions
  ];

  public static AuditStatusOptions = [
    { id: 1, name: 'OK' },
    { id: 0, name: 'For Review' }
  ];

  public static AuditStatusOptionsIncludeAll = [
    DefaultConstants.AllOption,
    ...ProjectConstants.AuditStatusOptions
  ];

  public static getProjectStatusName = function(id) {
    const result = this.ProjectStatusOptions.filter(function(c) {
      return id.toString().indexOf(c.id.toString()) >= 0;
    });
    return result[0].name;
  };

  public static getOnSiteStatusName = function(id) {
    const result = this.OnSiteStatusOptions.filter(function(c) {
      return id.toString().indexOf(c.id.toString()) >= 0;
    });

    return result[0].name;
  };

  public static getAuditStatusName = function(id) {
    const result = this.AuditStatusOptions.filter(function(c) {
      return id.toString().indexOf(c.id.toString()) >= 0;
    });

    return result[0].name;
  };
}
