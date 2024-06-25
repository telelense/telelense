import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { HomeComponent } from './home/home/home.component';
import { OrdersComponent } from './order/orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: VerifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
