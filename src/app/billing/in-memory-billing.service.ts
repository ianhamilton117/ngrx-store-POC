import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS, getStatusText } from 'angular-in-memory-web-api';

import { Payment } from './payment.model';
@Injectable({
  providedIn: 'root'
})
export class InMemoryBillingService implements InMemoryDbService {

  constructor() { }

  createDb() {
    //Mock payment history which would be stored in DB
    let payments: Payment[] = [
      new Payment(1, new Date(2018, 5, 29), "June Payment", 105.07),
      new Payment(2, new Date(2018, 6, 25), "July Payment", 97.28),
      new Payment(3, new Date(2018, 7, 28), "August Payment", 110.30),
    ];
    return { payments };
  }

  fault = {
    faultstring: "REST.Fault.101",
    faulttype: "WARNING",
    faultdescription: "We are looking into it",
    faultresponsecode: "500",
    faultMessage: "EGL129 Database Error - Customer Account NF"
  }

  // Uncomment below to simulate an error response (this doesn't work as expected, but I'm leaving it here for now)
  // get(reqInfo: RequestInfo) {return this.getError(reqInfo);}

  private getError(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      console.log("Overridden HTTP GET method");

      let options: ResponseOptions = {
        body: this.fault,
        status: STATUS.INTERNAL_SERVER_ERROR,
        statusText: "This is a disaster!"
      }
      
      return this.finishOptions(options, reqInfo);
    });
  }

  private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
    options.statusText = "This is a total disaster!"
    options.headers = headers;
    options.url = url;
    return options;
  }

}
