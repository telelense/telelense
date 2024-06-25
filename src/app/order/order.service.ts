import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, doc, Firestore, limit, orderBy, query, startAt, where } from '@angular/fire/firestore';
import { from, map, Observable, of } from 'rxjs';

import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private afs: Firestore,
  ) { }

  getList(id: string, page: number = 0): Observable<Order[]> {
    if (page < 0) {
      return of([]);
    }

    const countPerPage = 10;
    const me = doc(this.afs, 'user', id);
    return collectionData<Order>(
      query<Order>(
        collection(this.afs, 'order') as CollectionReference<Order>,
        where('owner', '==', me),
        orderBy('updated'),
        limit(countPerPage),
        startAt(page * countPerPage),
      ),
      { idField: 'id' },
    ) as Observable<Order[]>
  }

  addItem(id: string, model: Order) {
    const { ...data } = model;
    const owner = doc(this.afs, 'user', id);
    // const owner = 'user/' + id;
    return from(
      addDoc<Order>(
        collection(this.afs, 'order') as CollectionReference<Order>, { owner, ...data }
      )
    ).pipe(
      map(ref => {
        const id = ref.id;
        return { id, ...model } as Order;
      })
    )
  }

}
