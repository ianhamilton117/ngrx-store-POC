import { ActionReducerMap } from '@ngrx/store';

import * as BillingReducer from '../billing/store/billing.reducer';

//Application-wide state
export interface AppState {
    readonly billing: BillingReducer.State
}

//Application-wide reducers
export const reducers: ActionReducerMap<AppState> = {
    billing: BillingReducer.BillingReducer
}