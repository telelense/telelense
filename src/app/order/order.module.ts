import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    SharedModule,
  ]
})
export class OrderModule { }
