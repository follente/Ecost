import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculadoraPageComponent } from './pages/calculadora/calculadora.component';
import { UserInfoPageComponent } from './pages/userInfo/userInfo.component';

import { ButtonModule } from 'primeng/button';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { HistoricoPageComponent } from './pages/historico/historico.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    CalculadoraPageComponent,
    UserInfoPageComponent,
    HistoricoPageComponent,
    DashboardPageComponent
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
    MenuModule,
  ],
})
export class DashboardModule { }
