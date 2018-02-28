import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { FormGroup } from '@angular/forms'
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    saveDataByHttpPost(serviceRUL: string, requestBody: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers, method: RequestMethod.Post }); // Create a request option
        return this.http.post(this.baseUrl + serviceRUL, requestBody, options)
    }
}
