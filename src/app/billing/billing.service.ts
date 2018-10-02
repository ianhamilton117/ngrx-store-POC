import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import { Payment } from './payment.model';
import * as AppState from '../store/app.reducers';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BillingService {

  url = 'api/payments';

  constructor(private store: Store<AppState.AppState>, private http: HttpClient) { }

  submitPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.url, payment).pipe(
      tap(payment => payment.date = new Date(payment.date))
    );
  }

  loadPaymentHistory(): Observable<Object> {
    // return this.http.get<Object>(this.url).pipe(
    //   tap(res => console.log("Response: ", res)),
    //   tap(res => console.log("Payments: ", res['payments'])),
    //   tap(res => console.log("Fault: ", res['fault']))
    // )
    return this.http.get<Payment[]>(this.url).pipe(
      tap(payments => {
        payments.forEach(payment => payment.date = new Date(payment.date));
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    )
  }
}
