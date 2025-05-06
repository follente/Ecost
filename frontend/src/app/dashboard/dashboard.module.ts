import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormPageComponent } from './pages/form/form.component';
import { UserInfoPageComponent } from './pages/userInfo/userInfo.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    FormPageComponent,
    UserInfoPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
