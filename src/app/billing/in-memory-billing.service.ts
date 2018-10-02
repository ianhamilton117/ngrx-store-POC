import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Payment } from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryBillingService implements InMemoryDbService {

  constructor() { }

  createDb() {
    //Mock payment history which would be stored in DB
    let payments: Payment[] = [
      new Payment(1, new Date(2018, 5, 29), "June Payment", 105.07), // TO DO: Add ids to Payments
      new Payment(2, new Date(2018, 6, 25), "July Payment", 97.28),
      new Payment(3, new Date(2018, 7, 28), "August Payment", 110.30),
    ];
    let fault = {
      faultstring: "REST.Fault.101",
      faulttype: "WARNING",
      faultdescription: "We are looking into it",
      faultresponsecode: "500",
      faultMessage: "EGL129 Database Error - Customer Account NF"
    }
    return {payments};
  }
}
