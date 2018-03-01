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

import { Company } from '../../models/company.model';
import { Contractor } from '../../models/contractor.model';
import { Project } from '../../models/project.model';
@Component({
  selector: 'app-contractor-form',
  templateUrl: 'contractor-form.component.html',
  styleUrls: ['contractor-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorFormComponent implements OnInit {
  @Input()
  contractor: Contractor = {
    id: undefined,
    company: undefined,
    project: undefined
  };
  @Output() submit = new EventEmitter<Contractor>();
  contractorForm: FormGroup;
  // project: FormGroup;
  // auditStatus: FormControl;
  // onSite: FormControl;
  // projectStatus: FormControl;

  currentContractor: Contractor;

  onsiteOptions = [
    { name: 'On Site', value: true },
    { name: 'Off Site', value: false }
  ];

  auditStatusOptions = [
    { name: 'OK', value: true },
    { name: 'For review', value: false }
  ];

  // statusOptions = [
  //   { id: 1, name: 'Accept' },
  //   { id: 2, name: 'Reject' },
  //   { id: 3, name: 'For Review' },
  //   { id: 4, name: 'Required' },
  //   { id: 5, name: 'NOT Applicable' }
  // ];

  constructor() {}

  ngOnInit() {
    this.contractorForm = new FormGroup({
      id: new FormControl({ value: this.contractor.id, disabled: true }, [
        Validators.required
      ]),
      company: new FormGroup({
        name: new FormControl(
          { value: this.contractor.company.name, disabled: true },
          [Validators.required]
        ),
        email: new FormControl(
          { value: this.contractor.company.email, disabled: true },
          [Validators.required]
        )
      }),
      project: new FormGroup({
        id: new FormControl(
          { value: this.contractor.project.id, disabled: false },
          [Validators.required]
        ),
        mainProjectId: new FormControl(
          { value: this.contractor.project.mainProjectId, disabled: false },
          [Validators.required]
        ),
        auditStatus: new FormControl(this.contractor.project.auditStatus, [
          Validators.required
        ]),
        onSite: new FormControl(this.contractor.project.onSite, [
          Validators.required
        ]),
        isTerminated: new FormControl(this.contractor.project.isTerminated)
      })
    });

    // onSite?: boolean;
    // auditStatus?: boolean;
    // auditDate?: string;
    // expiryDate?: string;
    // status: ProjectStatus;

    // this.contractor.subscribe(x => {
    //   this.currentContractor = x;
    //   this.createFormControls();
    //   this.createForm();
    // });
  }
  // public createFormControls() {
  //   this.auditStatus = new FormControl(
  //     this.currentContractor.project.auditStatus,
  //     [Validators.required]
  //   );
  //   this.onSiteStatus = new FormControl(this.currentContractor.project.onSite, [
  //     Validators.required
  //   ]);
  //   this.projectStatus = new FormControl(
  //     this.currentContractor.project.status.id,
  //     [Validators.required]
  //   );
  // }
  // public createForm() {
  //   this.contractorForm = new FormGroup({
  //     auditStatus: this.auditStatus,
  //     onSiteStatus: this.onSiteStatus,
  //     projectStatus: this.projectStatus
  //   });
  // }

  // ngOnChanges() {
  //   if (this.contractor) {
  //     this.contractorForm.patchValue(this.contractor);
  //   }
  // }

  onSubmit() {
    if (this.contractorForm.valid) {
      const { value, valid, touched } = this.contractorForm;
      // console.log(this.contractorForm.value);
      // alert('start submit');
      // console.log(this.contractor);
      // this.currentContractor.project.onSite =
      //   this.onSiteStatus.value === 'true';
      // this.currentContractor.project.auditStatus = this.auditStatus.value;
      // this.currentContractor.project.status.id = this.projectStatus.value;
      // alert('on site status : ' + this.currentContractor.project.onSite);
      // console.log(this.currentContractor);
      console.log(this.contractorForm.value);
      this.submit.emit({ ...this.contractor, ...value });
    }
  }
}
