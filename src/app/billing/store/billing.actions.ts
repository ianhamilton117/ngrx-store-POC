import { Action } from '@ngrx/store';
import { Payment } from '../payment.model';

export const TRY_LOAD_PAYMENT_HISTORY = 'TRY_LOAD_PAYMENT_HISTORY';
export const LOAD_PAYMENT_HISTORY_SUCCESS = 'LOAD_PAYMENT_HISTORY_SUCCESS';
export const LOAD_PAYMENT_HISTORY_FAILED = 'LOAD_PAYMENT_HISTORY_FAILED';
export const TRY_SUBMIT_PAYMENT = 'TRY_SUBMIT_PAYMENT';
export const SUBMIT_PAYMENT_SUCCESS = 'SUBMIT_PAYMENT_SUCCESS';
export const SUBMIT_PAYMENT_FAILED = 'SUBMIT_PAYMENT_FAILED';

export class TryLoadPaymentHistory implements Action {
    readonly type = TRY_LOAD_PAYMENT_HISTORY
}

export class LoadPaymentHistorySuccess implements Action {
    readonly type = LOAD_PAYMENT_HISTORY_SUCCESS

    constructor(public payload: Payment[]) {}
}

export class LoadPaymentHistoryFailed implements Action {
    readonly type = LOAD_PAYMENT_HISTORY_FAILED

    constructor(public payload) {}
}

export class TrySubmitPayment implements Action {
    readonly type = TRY_SUBMIT_PAYMENT;

    constructor(public payload: Payment) {}
}

export class SubmitPaymentSuccess implements Action {
    readonly type = SUBMIT_PAYMENT_SUCCESS;

    constructor(public payload: Payment) {}
}

export class SubmitPaymentFailed implements Action {
    readonly type = SUBMIT_PAYMENT_FAILED;

    constructor(public payload) {}
}

export type BillingActions = 
    TryLoadPaymentHistory | 
    LoadPaymentHistorySuccess |
    LoadPaymentHistoryFailed |
    TrySubmitPayment |
    SubmitPaymentSuccess |
    SubmitPaymentFailed;