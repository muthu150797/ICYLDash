import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../Service/auth.guard';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,canActivate: [AuthGuard],
    data: {
      title: 'Dashboard'
    }
  }
  // {
  //   path:'dashboard',
  //   component:DashboardComponent,canActivate: [AuthGuard],
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class DashboardRoutingModule {}
