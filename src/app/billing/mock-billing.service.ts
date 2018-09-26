import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Payment } from './payment.model';
import * as AppState from '../store/app.reducers';

@Injectable({
  providedIn: 'root'
})
//A mock service to be replaced later
export class BillingService {

  //Mock payment history which would be stored in DB
  payments: Payment[] = [
    new Payment(new Date(2018, 5, 29), "June Payment", 105.06),
    new Payment(new Date(2018, 6, 25), "July Payment", 97.28),
    new Payment(new Date(2018, 7, 28), "August Payment", 110.30),
  ];

  constructor(private store: Store<AppState.AppState>) { }

  submitPayment(payment: Payment): Promise<Payment> {
    return new Promise((resolve, reject) => {
      if (payment.amount < 0) {
        let message = "Cannot submit payment with negative amount";
        reject(new Error(message));
      } else {
        //Add this payment to our mock payment history
        this.payments = [...this.payments, payment];

        resolve(payment);
      }
    })
  }

  loadPaymentHistory(): Promise<Payment[]> {
    return new Promise((resolve, reject) => {
      resolve(this.payments);
    })
  }
}
