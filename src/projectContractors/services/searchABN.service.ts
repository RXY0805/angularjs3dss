import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import 'rxjs/add/observable/throw';

import { ProjectContractor } from '../models/projectContractor.model';
@Injectable()
export class SearchABNService {
  private ABN_API_PATH = 'http://abr.business.gov.au/json/AbnDetails.aspx?callback=abnCallback&';
  private authGuid = 'acb92423-c0bc-42b0-a248-5110fa241e6c';
  constructor(private http: HttpClient) {}

  getCompanyByABN(abn: string): Observable<any> {
    return this.http
      .get<any>(`${this.ABN_API_PATH}abn=${abn}&guid=${this.authGuid}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
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
// 'http://abr.business.gov.au/json/AbnDetails.aspx?callback=abnCallback&abn=' + abn + '&guid=' + guid;
