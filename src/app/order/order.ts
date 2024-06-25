import { Timestamp } from "@angular/fire/firestore";
import { User } from "../auth/user";

export class Order {
  id?: string;
  comment: string = '';
  created?: Timestamp;
  equipment: string[] = [];
  isCompleted: boolean = false;
  level: string[] = [];
  notice: string = '';
  owner?: any;
  pin: any[] = [];
  price: number = 0;
  quality: string = '';
  specDateFrom?: Timestamp;
  specDateTo?: Timestamp;
  status: string = '';
  title: string = '';
  unit: string = '';
  unitCode: string = '';
  updated?: any;
  volunteers: any[] = [];
  maxVolunteer: number = 1;
}

// owner : user/SkvBzPNFb5aglMqlhv73CkCL3uC3
// volunteers : [ user/lPy9qUod8fhaMuQnQNCMkjM2bJz1, user/SelDGNNvUBgZmJG0dQDMq1hnt4u2 ]