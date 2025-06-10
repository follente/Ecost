import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UserInfoPageComponent } from './pages/userInfo/userInfo.component';
import { CalculadoraPageComponent } from './pages/calculadora/calculadora.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { HistoricoPageComponent } from './pages/historico/historico.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'calculadora', component: CalculadoraPageComponent },
      { path: 'historico', component: HistoricoPageComponent },
      { path: 'userInfo', component: UserInfoPageComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
