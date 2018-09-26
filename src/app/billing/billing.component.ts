import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppState from '../store/app.reducers';
import * as BillingActions from './store/billing.actions';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(private store: Store<AppState.AppState>) {
    // When the BillingComponent is loaded, load the payment history so that it is in the store
    this.store.dispatch(new BillingActions.TryLoadPaymentHistory());
  }

  ngOnInit() {
  }

}
