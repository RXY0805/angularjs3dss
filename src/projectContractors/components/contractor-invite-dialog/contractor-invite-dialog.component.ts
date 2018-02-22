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
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as fromStore from '../../store';
import { ProjectInvitation } from '../../models/project-contractor.model';
import { Company } from '../../models/company.model';
import { Project } from '../../models/project-contractor.model';
import { CustomValidators } from '../../../shared/validator/custom-validators';

@Component({
  styleUrls: ['contractor-invite-dialog.component.css'],
  templateUrl: 'contractor-invite-dialog.component.html'
})
export class ContractorInviteDialogComponent implements OnInit {
  companyForm: FormGroup;
  email: FormControl;
  abn: FormControl;

  duplicatedContractorIds: string[] = [];
  invitation: ProjectInvitation;
  isDuplicatedEmail: boolean;
  lastABN: string;
  selectedProject$: Observable<Project>;
  noneCompanyInvited: boolean;
  isCheckable: boolean;

  constructor(
    public dialogRef: MatDialogRef<ContractorInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Store<fromStore.ProjectContractorsState>,
    public form: FormBuilder
  ) {
    console.log(data.currentAvailableContractors);
    this.invitation = data.invitation;
    this.isDuplicatedEmail = false;
  }
  ngOnInit() {
    this.isCheckable = true;
    this.noneCompanyInvited = true;
    this.createFormControls();
    this.createForm();

    this.store.select(fromStore.getTradingEntity).subscribe(result => {
      this.invitation.tradingEntity = result ? result : null;
    });

    this.store.select(fromStore.getCompanyABN).subscribe(abn => {
      this.lastABN = abn;
    });

    this.store.select(fromStore.isDuplicatedEmail).subscribe(res => {
      this.isDuplicatedEmail = res && res.length ? true : false;
    });

    // this.selectedProject$ = this.store.select(fromStore.getSelectedProject);
  }
  public createFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.abn = new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      CustomValidators.abnValidator
    ]);
  }
  public createForm() {
    this.companyForm = new FormGroup({
      email: this.email,
      abn: this.abn
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onABNLookup() {
    if (this.lastABN !== this.companyForm.controls.abn.value) {
      this.store.dispatch(
        new fromStore.SearchABN(this.companyForm.controls.abn.value)
      );
    }
  }

  onToggleSelectedCompanies(event) {
    this.invitation.existCompanies = event;
    this.noneCompanyInvited = event && event.length ? false : true;
  }

  onInvitation(): void {
    console.log(this.invitation);
    this.store.dispatch(
      new fromStore.InviteExistCompaniesSuccess(this.invitation)
    );
  }

  onDuplicatedEmailCheck(value) {
    if (!this.companyForm.controls.email.errors) {
      this.invitation.email = value;
      this.store.dispatch(new fromStore.SetCompanyEmail(value));
    }
  }
}
