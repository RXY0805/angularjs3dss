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
import * as fromStore from '../../store';
import { ProjectInvitation } from '../../models/projectContractor.model';
import { Company } from '../../models/company.model';
import { Project } from '../../models/projectContractor.model';
import { FormBuilder } from '@angular/forms/src/form_builder';

@Component({
  styleUrls: ['contractor-invite-dialog.component.css'],
  templateUrl: 'contractor-invite-dialog.component.html'
})
export class ContractorInviteDialogComponent implements OnInit {
  public noneContractInvited: boolean;

  public duplicatedContractorIds: string[] = [];
  invitation: ProjectInvitation;
  isDuplicatedEmail: boolean;
  lastABN: string;
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
    this.isDuplicatedEmail = false;
  }
  ngOnInit() {
    this.store.select(fromStore.getTradingEntity).subscribe(tradingEntity => {
      this.invitation.newCompanyName = tradingEntity
        ? tradingEntity.EntityName
        : '';
    });

    this.store.select(fromStore.getCompanyABN).subscribe(abn => {
      this.lastABN = abn;
    });

    this.store.select(fromStore.isDuplicatedEmail).subscribe(res => {
      this.isDuplicatedEmail = res && res.length ? true : false;
    });

    // this.selectedProject$ = this.store.select(fromStore.getSelectedProject);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onABNLookup() {
    if (this.lastABN !== this.companyABNFormControl.value) {
      this.store.dispatch(
        new fromStore.SearchABN(this.companyABNFormControl.value)
      );
    }
  }
  getInvitedContractorIds(invitedContractorIds) {
    this.invitation.existContractIds = invitedContractorIds;
    this.noneContractInvited = !this.invitation.existContractIds.length;
  }
  getErrorMessage() {
    return this.emailFormControl.hasError('required')
      ? 'You must enter a value'
      : this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  // onInvitation(): void {
  // dispatch create invitation action then post data to web api
  // alert("please check console log");
  // console.log(this.invitation);
  // debugger;
  // this.store.dispatch(new projectInvitationActions.Create(this.invitation));
  // }

  onDuplicatedEmailCheck(value) {
    if (!this.emailFormControl.errors) {
      this.invitation.newCompanyEmail = value;
      this.store.dispatch(new fromStore.SetCompanyEmail(value));
    }
  }
}
