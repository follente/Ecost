import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthRoutingModule } from './auth-routing.module';
import { StartPageComponent } from './pages/start-page/start-page.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    StartPageComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ]
})
export class AuthModule { }
