import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';


@NgModule({
  declarations: [
    LoginComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ]
})
export class AuthModule { }
