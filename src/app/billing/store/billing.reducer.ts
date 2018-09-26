import { Bill } from "../bill.model";
import { Payment } from "../payment.model";
import * as BillingActions from "./billing.actions";

export interface State {
    bills: Bill[],
    payments: Payment[]
}

// Empty initial state to avoid things like null pointers
let initialState: State = {
    bills: [],
    payments: []
}

export function BillingReducer(state: State = initialState, action: BillingActions.BillingActions) {
    switch(action.type) {
        case BillingActions.LOAD_PAYMENT_HISTORY_SUCCESS:
            console.log("LOAD_PAYMENT_HISTORY_SUCCESS reducer called")
            return {...state, payments: action.payload};
        case BillingActions.SUBMIT_PAYMENT_SUCCESS:
            console.log("SUBMIT_PAYMENT_SUCCESS reducer called")
            const newPayments = [...state.payments, action.payload];
            return {...state, payments: newPayments};
        default:
            console.log("Default reducer called with type: " + action.type)
            return state;
    }
}