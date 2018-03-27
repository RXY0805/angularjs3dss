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
  OnInit,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material';
import * as fromStore from '../../store';
import { ContractorInviteDialogComponent } from '../contractor-invite-dialog/contractor-invite-dialog.component';
import { ProjectInvitation } from '../../models/project-contractor.model';
import { Company, Project, Contractor } from '@project-contractors/models';

import { FormBuilder } from '@angular/forms/src/form_builder';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contractor-invite',
  // styleUrls: ['./contractor-invite.component.css'],
  templateUrl: './contractor-invite.component.html'
})
export class ContractorInviteComponent implements OnInit, OnDestroy {
  @Input() project: Observable<Project>;
  @Output() sendInvitation = new EventEmitter<ProjectInvitation>();
  availableContractors$: Observable<Contractor[]>;
  currentProject: Project;
  invitation: ProjectInvitation;
  currentAvailableContractors: Contractor[];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.ProjectContractorsState>
  ) {}
  ngOnInit() {
    this.project.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      this.currentProject = x;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  openDialog(): void {
    this.availableContractors$ = this.store
      .select(fromStore.getAvailableContractors)
      .pipe(takeUntil(this.unsubscribe$));

    this.invitation = {
      projectId: this.currentProject.id,
      existCompanies: []
    };

    const dialogRef = this.dialog.open(ContractorInviteDialogComponent, {
      width: '850px',
      data: {
        currentProject: this.currentProject,
        currentAvailableContractors: this.availableContractors$,
        invitation: this.invitation
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(invitation => {
      if (invitation) {
        this.sendInvitation.emit(invitation);
      }
    });
  }
}
