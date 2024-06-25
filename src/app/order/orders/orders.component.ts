import { Component, OnInit } from '@angular/core';
import { serverTimestamp, Timestamp } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userID?: string;
  // onGoingDataSource = [{ status: 'Before Payment', title: 'Ulleungdo Squid Boat Shooting', price: 30, unit: '$', candidate: '1/2' },];
  // completedDataSource = [{ status: 'Before Payment', title: 'Ulleungdo Squid Boat Shooting', price: 30, unit: '$', candidate: '1/2' },];
  onGoingDataSource: Order[] = [];
  completedDataSource: Order[] = [];
  displayedColumns: string[] = ['status', 'title', 'price', 'candidate', 'notice'];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.authService.user$.subscribe(user => {
      if (typeof user?.uid !== 'string') {
        return;
      }
      this.userID = user?.uid;
      this.loadOrders(user?.uid);
    });
  }

  loadOrders(id: string) {
    this.orderService.getList(id, 0).subscribe(collection => {
      console.log('collection', collection);
      this.onGoingDataSource = collection.filter(model => !model.isCompleted);
      this.completedDataSource = collection.filter(model => model.isCompleted);
    })
  }

  addDummyOrder() {
    console.log('addDummyOrder');
    if (typeof this.userID !== 'string') {
      console.log('no user id');
      return;
    }
    const now = serverTimestamp();
    this.orderService.addItem(this.userID, {
      comment: '',
      equipment: [],
      isCompleted: Math.random() > 0.5,
      level: [],
      notice: '',
      pin: [],
      price: Math.round(Math.random() * 100),
      quality: '',
      status: 'Dummy Status',
      title: 'Dummy Title',
      unit: '$',
      unitCode: 'USD',
      updated: now,
      volunteers: [],
      maxVolunteer: 1 + Math.round(Math.random() * 30),
    }).subscribe(data => {
      console.log('???', data);
    })
  }

}
