export class ProjectConstants {
  public static ProjectStatusOptions = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Declined' },
    { id: 3, name: 'Accepted' },
    { id: 4, name: 'Required' },
    { id: 5, name: 'Terminated' },
    { id: 6, name: 'Invited' }
  ];

  public static OnsiteOptions = [
    { name: 'On Site', value: true },
    { name: 'Off Site', value: false }
  ];

  public static AuditStatusOptions = [
    { name: 'OK', value: true },
    { name: 'For review', value: false }
  ];
}
