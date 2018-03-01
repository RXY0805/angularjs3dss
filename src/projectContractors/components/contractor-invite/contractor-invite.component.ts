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

import { MatDialog } from '@angular/material';
import * as fromStore from '../../store';
import { ContractorInviteDialogComponent } from '../contractor-invite-dialog/contractor-invite-dialog.component';
import { ProjectInvitation } from '../../models/project-contractor.model';
import { Company } from '../../models/company.model';
import { Project } from '../../models/project.model';
import { Contractor } from '../../models/contractor.model';
import { FormBuilder } from '@angular/forms/src/form_builder';

@Component({
  selector: 'app-contractor-invite',
  // styleUrls: ['./contractor-invite.component.css'],
  templateUrl: './contractor-invite.component.html'
})
export class ContractorInviteComponent implements OnInit {
  @Input() selectedProject: Observable<any>;
  availableContractors$: Observable<Contractor[]>;
  currentProject: Project;
  invitation: ProjectInvitation;
  currentAvailableContractors: Contractor[];

  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.ProjectContractorsState>
  ) {}
  ngOnInit() {
    this.selectedProject.subscribe(x => {
      // console.log(x);
      this.currentProject = x;
    });
  }

  openDialog(): void {
    this.availableContractors$ = this.store.select(
      fromStore.getAvailableContractors
    );

    this.invitation = {
      projectId: this.currentProject.id
    };

    const dialogRef = this.dialog.open(ContractorInviteDialogComponent, {
      width: '750px',
      data: {
        currentProject: this.currentProject,
        currentAvailableContractors: this.availableContractors$,
        invitation: this.invitation
      }
    });

    dialogRef.afterClosed().subscribe(invitation => {
      if (invitation) {
        // this.onInvite.emit(invitation);
      }
    });
  }
}
