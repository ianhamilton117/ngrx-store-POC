import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as BillingActions from './billing.actions';
import { Payment } from '../payment.model';
import { BillingService } from '../mock-billing.service';

@Injectable()
export class BillingEffects {

    @Effect()
    submitPayment = this.actions
        //If the action is of type TRY_SUBMIT_PAYMENT
        .ofType(BillingActions.TRY_SUBMIT_PAYMENT)
        .pipe(
            //Extract the payload from the action
            map((action: BillingActions.TrySubmitPayment) => action.payload),
            //Call the billingService to submit the payment
            switchMap((payment: Payment) => {
                return from(this.billingService.submitPayment(payment))
            }),
            //Upon successful submission, return a SUBMIT_PAYMENT_SUCCESS action to be handled by ngrx/effects
            map((payment) => {
                return {
                    type: BillingActions.SUBMIT_PAYMENT_SUCCESS,
                    payload: payment
                }
            })
        );

    constructor(private actions: Actions, private billingService: BillingService) {

    }

}