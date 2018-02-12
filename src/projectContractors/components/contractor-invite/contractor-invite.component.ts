import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import {
  Component,
  Output,
  Input,
  EventEmitter,
  Inject,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { ContractorInviteDialogComponent } from './contractor-invite-dialog.component';
import * as fromStore from '../../store';
import { ProjectInvitation } from '../../models/projectContractor.model';
import { Company } from '../../models/company.model';
@Component({
  selector: 'app-contractor-invite',
  // styleUrls: ['./contractor-invite.component.css'],
  templateUrl: './contractor-invite.component.html'
})
export class ContractorInviteComponent implements OnInit {
  invitation: ProjectInvitation = {
    existContractIds: ([] = []),
    projectId: 0
  };
  // contractorFilter$: ContractorFilter = {
  //   searchText:'',
  //   isPending: false,
  //   selectedProjectId: 0,
  // }
  availableContractors: Observable<Company[]>;
  @Input() selectedProjectId: number;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.ProjectContractorsState>
  ) {}

  ngOnInit() {
    this.availableContractors = this.store.select(
      fromStore.getAvailableContractors
    );
  }

  openDialog(): void {
    this.invitation.projectId = this.selectedProjectId;
    const dialogRef = this.dialog.open(ContractorInviteDialogComponent, {
      width: '650px',
      data: {
        projectId: this.selectedProjectId,
        availableContractors: this.availableContractors,
        isCheckable: true,
        invitation: this.invitation
        // duplicatedContractorIds: this.duplicatedContractorIds
      }
    });

    dialogRef.afterClosed().subscribe(invitation => {
      if (invitation) {
        // this.onInvite.emit(invitation);
      }
    });
  }
}

@Component({
  // selector: 'contractor-invite-dialog',
  // styleUrls: ['contractor-invite-dialog.component.css'],
  templateUrl: 'contractor-invite-dialog.component.html'
})
export class ContractorInviteDialogComponent {
  public noneContractInvited: boolean;
  public isExistedEmail: boolean;
  public duplicatedContractorIds: string[] = [];
  invitation: ProjectInvitation = {
    projectId: 0
  };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(
    public dialogRef: MatDialogRef<ContractorInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Store<fromStore.ProjectContractorsState>
  ) {
    console.log(data);
    this.noneContractInvited = true;

    this.invitation = data.invitation;
    this.isExistedEmail = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getInvitedContractorIds(invitedContractorIds) {
    this.invitation.existContractIds = invitedContractorIds;
    this.noneContractInvited = !this.invitation.existContractIds.length;
  }

  // onInvitation(): void {
  // dispatch create invitation action then post data to web api
  // alert("please check console log");
  // console.log(this.invitation);
  // debugger;
  // this.store.dispatch(new projectInvitationActions.Create(this.invitation));
  // }

  //   triggerEmailSearch(value) {
  //     if (!this.emailFormControl.errors) {
  //       this.invitation.newContractEmail = value;
  //       this.store
  //         .select(state =>
  //           getDuplicatedContractorIds(state.contractors.contractors)
  //         )
  //         .subscribe(res => (this.duplicatedContractorIds = res as string[]));
  //       this.store.dispatch(new contractorsActions.CheckEmailExist(value));
  //       this.isExistedEmail = this.duplicatedContractorIds.length > 0;
  //     }
  //   }
}
