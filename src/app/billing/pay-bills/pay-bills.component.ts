import { Component, OnInit } from '@angular/core';

import { BillingService } from '../billing.service';
import { Payment } from '../payment.model';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.css']
})
export class PayBillsComponent implements OnInit {

  constructor(private billingService: BillingService) { }

  ngOnInit() {
  }

  submitPayment(desc: string, amt: number) {
    let payment = new Payment(new Date(), desc, amt);
    console.log(payment);
    this.billingService.submitPayment({date: new Date(), description: desc, amount: amt});
    // this.store.dispatch(new BillingActions.TrySubmitPayment({date: new Date(), description: "This is a payment", amount: 50}));
  }

}
