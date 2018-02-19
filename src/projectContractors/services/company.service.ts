import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ProjectContractor } from '../models/project-contractor.model';
@Injectable()
export class CompanyService {
  private ABN_API_PATH = 'http://abr.business.gov.au/json/AbnDetails.aspx?&';
  private authGuid = 'acb92423-c0bc-42b0-a248-5110fa241e6c';

  constructor(private http: HttpClient) {}

  getCompanyByABN(abn: string): Observable<any> {
    return this.http
      .jsonp(`${this.ABN_API_PATH}abn=${abn}&guid=${this.authGuid}`, 'callback')
      .map(data => data)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
    // .
    //   .get<ABNEntity>(
    //     `${this.ABN_API_PATH}abn=${abn}&guid=${this.authGuid}`,
    //     this.httpOptions
    //   )
    // .pipe(catchError((error: any) => Observable.throw(error.json())))
  }

  // getCompany(abn: string): Observable<any> {
  //   return this.http
  //     .get<any>(`${this.ABN_API_PATH}abn=${abn}&guid=${this.authGuid}`)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }
  // private handleError(error: any) {
  //   const errMsg = error.message
  //     ? error.message
  //     : error.status
  //       ? `${error.status} - ${error.statusText}`
  //       : 'Server   error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }

  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body || [];
  // }
}
// return sample

// abnCallback({
//     "Abn":"88758923246",
//     "AbnStatus":"Active",
//     "AddressDate":"2017-10-05",
//     "AddressPostcode":"4123",
//     "AddressState":"QLD",
//     "BusinessName":[

//     ],
//     "EntityName":"SAHLON, JASVIR SINGH ",
//     "EntityTypeCode":"IND",
//     "EntityTypeName":"Individual\/Sole Trader",
//     "Gst":null,
//     "Message":""
//  })

// abn valid code
// 88758923246
// 96638532587
// abn auth guid
// acb92423-c0bc-42b0-a248-5110fa241e6c
//   http://abr.business.gov.au/json/AbnDetails.aspx?abn=96638532587&guid=acb92423-c0bc-42b0-a248-5110fa241e6c
// 'http://abr.business.gov.au/json/AbnDetails.aspx?callback=abnCallback&abn=' + abn + '&guid=' + guid;
