import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Payment } from '../payment.model';
import { AppState } from '../../store/app.reducers';
import * as BillingActions from '../store/billing.actions';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.css']
})
export class PayBillsComponent implements OnDestroy {

  destroyed$ = new Subject<boolean>();
  successFlag = false;
  failureFlag = false;

  constructor(private store: Store<AppState>, private actions$: Actions) {
    // Subscribe to success/failure actions and display feedback to user
    this.actions$.pipe(
      ofType(BillingActions.SUBMIT_PAYMENT_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => this.successFlag = true)
    ).subscribe();

    this.actions$.pipe(
      ofType(BillingActions.SUBMIT_PAYMENT_FAILED),
      takeUntil(this.destroyed$),
      tap(() => this.failureFlag = true)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  submitPayment(desc: string, amt: number) {
    this.successFlag = false;
    this.failureFlag = false;
    let payment = new Payment(Math.random(), new Date(), desc, amt);
    this.store.dispatch(new BillingActions.TrySubmitPayment(payment));
  }

}
