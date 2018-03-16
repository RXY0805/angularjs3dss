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
import { Project } from '../../models/project.model';
import { TradingEntity } from '../../models/trading-entity.model';

import { CustomValidators } from '../../../shared/validator/custom-validators';
import { getTradingEntity } from '../../store/reducers/company.reducer';

@Component({
  styleUrls: ['contractor-invite-dialog.component.css'],
  templateUrl: 'contractor-invite-dialog.component.html'
})
export class ContractorInviteDialogComponent implements OnInit {
  companyForm: FormGroup;
  email: FormControl;

  duplicatedContractorIds: string[] = [];
  invitation: ProjectInvitation;
  selectedProject$: Observable<Project>;
  isCompanyInvited: boolean;
  isCheckable: boolean;
  isABNActived: boolean;
  constructor(
    public dialogRef: MatDialogRef<ContractorInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Store<fromStore.ProjectContractorsState>,
    public form: FormBuilder
  ) {
    this.invitation = data.invitation;
  }
  ngOnInit() {
    this.isCheckable = true;
    this.isCompanyInvited = false;
    this.createFormControls();
    this.createForm();
  }

  public createFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  public createForm() {
    this.companyForm = new FormGroup({
      email: this.email
    });
  }

  // onABNLookup() {
  //   if (this.lastABN !== this.companyForm.controls.abn.value) {
  //     this.store.dispatch(
  //       new fromStore.SearchABN(this.companyForm.controls.abn.value)
  //     );
  //   }
  // }

  onToggleSelectedCompany(event) {
    if (parseInt(event.id, 10) > 0) {
      let index = -1;

      if (
        this.invitation.existCompanies &&
        this.invitation.existCompanies.length
      ) {
        index = this.invitation.existCompanies
          .map(function(c) {
            return c.id;
          })
          .indexOf(event.id);
      }
      if (index < 0) {
        const selectedCompany: Company = {
          id: event.id,
          name: event.name
        };
        this.invitation.existCompanies.push(selectedCompany);
        console.log(this.invitation.existCompanies);
      } else {
        if (!event.isMasterToggle) {
          this.invitation.existCompanies.splice(index, 1);
        }
      }
    } else {
      // clear exist companies list while untick all checkbox
      this.invitation.existCompanies = [];
    }

    this.isCompanyInvited =
      this.invitation.existCompanies && this.invitation.existCompanies.length
        ? true
        : false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onInvitation(): void {
    this.dialogRef.close(this.invitation);
  }
}
