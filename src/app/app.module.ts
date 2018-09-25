import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { BillingComponent } from './billing/billing.component';
import { PaymentHistoryComponent } from './billing/payment-history/payment-history.component';
import { PayBillsComponent } from './billing/pay-bills/pay-bills.component';
import { reducers } from './store/app.reducers';
import { BillingEffects } from './billing/store/billing.effects';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'billing/history', component: PaymentHistoryComponent },
  { path: 'billing/pay', component: PayBillsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    PaymentHistoryComponent,
    PayBillsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BillingEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
