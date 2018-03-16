import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError, distinct } from 'rxjs/operators';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

import { Company, Contractor, Project } from '@project-contractors/models';
import { ProjectConstants } from '@shared-utility/constants';

@Component({
  selector: 'app-contractor-form',
  templateUrl: 'contractor-form.component.html',
  styleUrls: ['contractor-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorFormComponent implements OnInit {
  @Input()
  contractor: Contractor = {
    contractorId: undefined,
    principalProjectId: undefined,
    companyName: undefined,
    statusId: undefined,
    onSite: undefined,
    auditComplete: undefined,
    licenceExpires: undefined,
    auditUserName: undefined
  };

  @Output() submit = new EventEmitter<Contractor>();
  @Output() cancel = new EventEmitter();
  contractorForm: FormGroup;

  currentContractor: Contractor;

  statusList = ProjectConstants.ProjectStatusEditingOptions;
  onSiteStatusList = ProjectConstants.OnSiteStatusOptions;
  auditStatusList = ProjectConstants.AuditStatusOptions;

  constructor() {}

  ngOnInit() {
    this.contractorForm = new FormGroup({
      contractorId: new FormControl(
        { value: this.contractor.contractorId, disabled: true },
        [Validators.required]
      ),
      companyName: new FormControl(
        { value: this.contractor.companyName, disabled: true },
        [Validators.required]
      ),
      statusId: new FormControl(this.contractor.statusId, [
        Validators.required
      ]),
      auditComplete: new FormControl(this.contractor.auditComplete, [
        Validators.required
      ]),
      onSite: new FormControl(this.contractor.onSite, [Validators.required])
    });
  }

  onSubmit() {
    if (this.contractorForm.valid) {
      const { value, valid, touched } = this.contractorForm;
      this.submit.emit({ ...this.contractor, ...value });
    }
  }
  onCancel() {
    this.cancel.emit();
  }
  //
}
