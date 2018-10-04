import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil, tap } from 'rxjs/operators';

import * as AppState from '../../store/app.reducers';
import * as BillingReducer from '../store/billing.reducer';
import { Payment } from '../payment.model';
import * as BillingActions from '../store/billing.actions';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit, OnDestroy {
  billingState: Observable<BillingReducer.State>;
  payments: Payment[];
  destroyed$ = new Subject<boolean>();
  failureFlag = false;
  errorMessage = null;


  constructor(private store: Store<AppState.AppState>, private actions$: Actions) {
    this.actions$.pipe(
      ofType(BillingActions.LOAD_PAYMENT_HISTORY_FAILED),
      takeUntil(this.destroyed$),
      tap((action: BillingActions.LoadPaymentHistoryFailed) => {
        this.failureFlag = true;
        this.errorMessage = action.payload;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.billingState = this.store.select('billing');
  }

  reloadPaymentHistory() {
    this.failureFlag = false;
    this.store.dispatch(new BillingActions.TryLoadPaymentHistory());
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

}
