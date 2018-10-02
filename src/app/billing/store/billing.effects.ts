import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

import * as BillingActions from './billing.actions';
import { Payment } from '../payment.model';
import { BillingService } from '../billing.service';

@Injectable()
export class BillingEffects {

    @Effect()
    submitPayment = this.actions$.pipe(
        // If the action is of type TRY_SUBMIT_PAYMENT
        ofType(BillingActions.TRY_SUBMIT_PAYMENT),
        // Extract the payload from the action
        map((action: BillingActions.TrySubmitPayment) => action.payload),
        // Call the billingService to submit the payment
        switchMap((payment: Payment) => {
            return this.billingService.submitPayment(payment)
                .pipe(
                    // Upon successful submission, return a SUBMIT_PAYMENT_SUCCESS action to be handled by ngrx/effects
                    map((payment) => {
                        return {
                            type: BillingActions.SUBMIT_PAYMENT_SUCCESS,
                            payload: payment
                        }
                    }),
                    // If Promise was rejected, return a SUBMIT_PAYMENT_FAILED action to be handled by ngrx/effects
                    catchError(error => {
                        return of({
                            type: BillingActions.SUBMIT_PAYMENT_FAILED,
                            payload: error
                        })
                    })
                )
        })
    );

    @Effect()
    loadPaymentHistory = this.actions$.pipe(
        // If the action is of type TRY_LOAD_PAYMENT_HISTORY
        ofType(BillingActions.TRY_LOAD_PAYMENT_HISTORY),
        // Call the billingService to load the payment history
        switchMap(() => {
            return from(this.billingService.loadPaymentHistory())
                .pipe(
                    // Once loaded, return a LOAD_PAYMENT_HISTORY_SUCCESS with the payment history as its payload
                    map((payments) => {
                        return {
                            type: BillingActions.LOAD_PAYMENT_HISTORY_SUCCESS,
                            payload: payments
                        }
                    }),
                    // If Promise was rejected, return a LOAD_PAYMENT_HISTORY_FAILED action to be handled by ngrx/effects
                    catchError(error => {
                        return of({
                            type: BillingActions.LOAD_PAYMENT_HISTORY_FAILED,
                            payload: error
                        })
                    })
                )
        })
    );

    constructor(private actions$: Actions, private billingService: BillingService) {

    }

}