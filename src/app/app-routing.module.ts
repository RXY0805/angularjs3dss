import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';

import { ProjectContractorsModule } from '../projectContractors/projectContractors.module';

// Fix Lazy loading routing issue
// https://github.com/angular/angular-cli/issues/3204

export function loadChildrenContact() {
  return ProjectContractorsModule;
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/contractors'
  },
  {
    path: 'contractors',
    loadChildren: loadChildrenContact
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
