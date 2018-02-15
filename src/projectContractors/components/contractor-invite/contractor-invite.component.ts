import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';
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
// import { ContractorInviteDialogComponent } from './contractor-invite-dialog.component';
import * as fromStore from '../../store';
import { ProjectInvitation } from '../../models/projectContractor.model';
import { Company } from '../../models/company.model';
import { Project } from '../../models/projectContractor.model';
import { FormBuilder } from '@angular/forms/src/form_builder';

@Component({
  selector: 'app-contractor-invite',
  // styleUrls: ['./contractor-invite.component.css'],
  templateUrl: './contractor-invite.component.html'
})
export class ContractorInviteComponent {
  @Input() selectedProject: Observable<Project>;
  @Input() availableContractors: Observable<Company[]>;
  currentProject: Project;
  // currentAvailableContractors: Company[];
  invitation: ProjectInvitation = {
    existContractIds: ([] = []),
    projectId: 0
  };
  // contractorFilter$: ContractorFilter = {
  //   searchText:'',
  //   isPending: false,
  //   selectedProjectId: 0,
  // }

  // @Input() selectedProjectId: number;
  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.ProjectContractorsState>
  ) {}

  openDialog(): void {
    this.selectedProject.subscribe(x => {
      this.currentProject = x;
    });
    // this.availableContractors.subscribe(x => {
    //   this.currentAvailableContractors = x;
    // });
    const dialogRef = this.dialog.open(ContractorInviteDialogComponent, {
      width: '650px',
      data: {
        currentProject: this.currentProject,
        availableContractors: this.availableContractors,
        currentAvailableContractors: this.availableContractors,
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
export class ContractorInviteDialogComponent implements OnInit {
  public noneContractInvited: boolean;
  public isExistedEmail: boolean;
  public duplicatedContractorIds: string[] = [];
  invitation: ProjectInvitation;

  selectedProject$: Observable<Project>;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  companyABNFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(11),
    Validators.minLength(11)
  ]);

  constructor(
    public dialogRef: MatDialogRef<ContractorInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Store<fromStore.ProjectContractorsState>
  ) {
    this.noneContractInvited = true;

    this.invitation = data.invitation;
    this.isExistedEmail = false;
  }
  ngOnInit() {
    // this.selectedProject$ = this.store.select(fromStore.getSelectedProject);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onABNLookup(): void {
    // http://abr.business.gov.au/json/AbnDetails.aspx?callback=abnCallback&abn=68118606303&guid=acb92423-c0bc-42b0-a248-5110fa241e6c
    alert('search ABN' + this.invitation.newCompanyABN);
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
