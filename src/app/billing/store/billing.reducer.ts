import { Bill } from "../bill.model";
import { Payment } from "../payment.model";
import * as BillingActions from "./billing.actions";

export interface State {
    bills: Bill[],
    payments: Payment[]
}

let defaultState: State = {
    bills: [],
    payments: [{date: new Date(), description: "This is a test", amount: 25}]
}

export function BillingReducer(state: State = defaultState, action: BillingActions.BillingActions) {
    switch(action.type) {
        case BillingActions.GET_BILLING_HISTORY:
            console.log("GET_BILLING_HISTORY reducer called")
            return state;
        case BillingActions.GET_PAYMENT_HISTORY:
            console.log("GET_PAYMENT_HISTORY reducer called")
            return state;
        case BillingActions.SUBMIT_PAYMENT_SUCCESS:
            console.log("SUBMIT_PAYMENT_SUCCESS reducer called")
            const newPayments = [...state.payments, action.payload];
            return {...state, payments: newPayments};
        default:
            console.log("Default reducer called with type: " + action.type)
            return state;
    }
}