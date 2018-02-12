import { ContractorSearchComponent } from './contractor-search/contractor-search.component';
import { ContractorListComponent } from './contractor-list/contractor-list.component';
import {
  ContractorInviteComponent,
  ContractorInviteDialogComponent
} from './contractor-invite/contractor-invite.component';
//import { ContractorInviteDialogComponent } from './contractor-invite/contractor-invite-dialog.component';
export const components: any[] = [
  ContractorSearchComponent,
  ContractorListComponent,
  ContractorInviteComponent,
  ContractorInviteDialogComponent
  // ContractorInviteDialogComponent
];

export * from './contractor-search/contractor-search.component';
export * from './contractor-list/contractor-list.component';
export * from './contractor-invite/contractor-invite.component';
//export * from './contractor-invite/contractor-invite-dialog.component';
