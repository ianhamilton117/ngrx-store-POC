import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Payment } from './payment.model';
import * as AppState from '../store/app.reducers';
import * as BillingActions from './store/billing.actions';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private store: Store<AppState.AppState>) { }

  getPaymentHistory() {
    console.log("Get payment history service call");
  }

  submitPayment(payment: Payment) {
    //Make async call to payment provider. Upon successful completion, do the following:
    this.store.dispatch(new BillingActions.SubmitPaymentSuccess(payment));
  }
}
