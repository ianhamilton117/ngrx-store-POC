import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import * as BillingActions from './billing.actions';
import { Payment } from '../payment.model';

@Injectable()
export class BillingEffects {

    // @Effect()
    // submitPayment = this.actions
    //     .ofType(BillingActions.TRY_SUBMIT_PAYMENT)
    //     .pipe(
    //         map((action: BillingActions.TrySubmitPayment) => action.payload),
    //         switchMap((payment: Payment) => {

    //         })
    //     );

    constructor(private actions: Actions) {

    }

}