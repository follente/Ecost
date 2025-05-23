import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { FormPageComponent } from './pages/form/form.component';
import { UserInfoPageComponent } from './pages/userInfo/userInfo.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'form', component: FormPageComponent },
      { path: 'userInfo', component: UserInfoPageComponent },
      { path: '**', redirectTo: 'form' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
