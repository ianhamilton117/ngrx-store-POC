import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Payment } from '../payment.model';
import { AppState } from '../../store/app.reducers';
import * as BillingActions from '../store/billing.actions';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.css']
})
export class PayBillsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  submitPayment(desc: string, amt: number) {
    let payment = new Payment(new Date(), desc, amt);
    this.store.dispatch(new BillingActions.TrySubmitPayment(payment));
  }

}
