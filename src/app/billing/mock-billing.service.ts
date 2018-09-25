import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Payment } from './payment.model';
import * as AppState from '../store/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
//A mock service to be replaced later

  constructor(private store: Store<AppState.AppState>) { }

  submitPayment(payment: Payment): Promise<Payment> {
    return new Promise((resolve, reject) => {
      if (payment.amount < 0) {
        let message = "Cannot submit payment with negative amount";
        reject(new Error(message));
      } else {
        resolve(payment);
      }
    })
  }
}
