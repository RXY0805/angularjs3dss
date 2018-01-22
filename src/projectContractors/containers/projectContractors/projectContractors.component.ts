import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { ProjectContractor } from '../../models/projectContractor.model';

@Component({
  selector: 'app-project-contractors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['projectContractors.component.css'],
  templateUrl: './projectContractors.component.html'
})
export class ProjectContractorsComponent implements OnInit {
  projectContractors$: Observable<ProjectContractor[]>;

  constructor(private store: Store<fromStore.ProjectContractorsState>) {}

  ngOnInit() {
    // this.projectContractors$ = this.store.select(fromStore.getAllProjectContractors);
  }
}
