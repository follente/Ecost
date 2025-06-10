import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPageComponent } from './pages/form/form.component';
import { UserInfoPageComponent } from './pages/userInfo/userInfo.component';

import { ButtonModule } from 'primeng/button';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';


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
    ButtonModule,
    FormsModule,

    /* PrimeNG */
    TabViewModule,
    InputTextModule,
    RadioButtonModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ChartModule,
    MenuModule
  ]
})
export class DashboardModule { }
