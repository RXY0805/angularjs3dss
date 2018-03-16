import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
import { MaterialModule } from '../shared/material/material.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromGuards from './guards';
import * as fromServices from './services';

import { NumberOnlyDirective } from '../shared/directives/number-only';
import { ShowErrorsComponent } from '../shared/errors/show-error.component';
// import * as fromProjectFilterReducer from './store/reducers/project-filter.reducer';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.ProjectContractorsGuard],
    component: fromContainers.ProjectContractorsComponent
  },
  {
    path: ':contractorId',
    canActivate: [
      fromGuards.ProjectContractorsGuard,
      fromGuards.ProjectContractorExistsGuards
    ],
    component: fromContainers.ContractorEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('projectContractors', reducers),

    EffectsModule.forFeature(effects),
    MaterialModule
  ],
  providers: [...fromServices.services, ...fromGuards.guards], //
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    NumberOnlyDirective,
    ShowErrorsComponent
  ],
  entryComponents: [fromComponents.ContractorInviteDialogComponent], //
  exports: [...fromContainers.containers, ...fromComponents.components] //
})
export class ProjectContractorsModule {}
//
