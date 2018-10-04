import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Payment } from './payment.model';
import * as AppState from '../store/app.reducers';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BillingService {

  // url = 'https://010450e6-4507-4523-9bb5-d3d2d8afe8e8.mock.pstmn.io/payments'; // Working Postman URL (only works for payment history, not payment submission)
  // url = 'https://010450e6-4507-4523-9bb5-d3d2d8afe8e8.mock.pstmn.io/err'; // Simulated error Postman URL (returns simulated TIBCO error on payment history retrieval)
  url='api/payments' // Working InMemoryBillingService URL (works for payment submission and payment history, but no error simulation)

  constructor(private store: Store<AppState.AppState>, private http: HttpClient) { }

  submitPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.url, payment).pipe(
      tap(payment => payment.date = new Date(payment.date))
    );
  }

  loadPaymentHistory(): Observable<Object> {
    return this.http.get<Payment[]>(this.url).pipe(
      tap((payments) => {
        payments.forEach(payment => payment.date = new Date(payment.date));
      }),
      catchError(error => this.handleError(error))
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    // return an observable with a user-facing error message
    return throwError('Network error, please try again later');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error);
    // return an observable with a user-facing error message
    return throwError(error.error.faultdescription);
    }
  };
  
}
