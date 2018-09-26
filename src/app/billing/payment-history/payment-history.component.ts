import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AppState from '../../store/app.reducers';
import * as BillingReducer from '../store/billing.reducer';
import { Payment } from '../payment.model';
import * as BillingActions from '../store/billing.actions';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  billingState: Observable<BillingReducer.State>;
  payments: Payment[];

  constructor(private store: Store<AppState.AppState>) { }

  ngOnInit() {
    this.billingState = this.store.select('billing');
  }

  reloadPaymentHistory() {
    this.store.dispatch(new BillingActions.TryLoadPaymentHistory());
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

}
