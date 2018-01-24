import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
import { MaterialModule } from '../shared/material/material.module';

import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.ProjectContractorsGuard],
    component: fromContainers.ProjectContractorsComponent
  },
  {
    path: ':projectId',
    // canActivate: [fromGuards.ProjectContractorExistsGuards,],
    component: fromContainers.ProjectContractorsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('projectContractors', reducers),
    EffectsModule.forFeature(effects),
    MaterialModule
  ],
  providers: [...fromServices.services, ...fromGuards.guards], //
  declarations: [...fromContainers.containers, ...fromComponents.components], //
  exports: [...fromContainers.containers, ...fromComponents.components] //
})
export class ProjectContractorsModule {}
//
