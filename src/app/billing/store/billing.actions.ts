import { Action } from '@ngrx/store';
import { Payment } from '../payment.model';

export const GET_BILLING_HISTORY = 'GET_BILLING_HISTORY';
export const GET_PAYMENT_HISTORY = 'GET_PAYMENT_HISTORY';
export const TRY_SUBMIT_PAYMENT = 'TRY_SUBMIT_PAYMENT';
export const SUBMIT_PAYMENT_SUCCESS = 'SUBMIT_PAYMENT_SUCCESS';

export class GetBillingHistory implements Action {
    readonly type = GET_BILLING_HISTORY
}

export class GetPaymentHistory implements Action {
    readonly type = GET_PAYMENT_HISTORY
}

export class TrySubmitPayment implements Action {
    readonly type = TRY_SUBMIT_PAYMENT;

    constructor(public payload: Payment) {}
}

export class SubmitPaymentSuccess implements Action {
    readonly type = SUBMIT_PAYMENT_SUCCESS;

    constructor(public payload: Payment) {}
}

export type BillingActions = 
    GetBillingHistory | 
    GetPaymentHistory | 
    TrySubmitPayment |
    SubmitPaymentSuccess;