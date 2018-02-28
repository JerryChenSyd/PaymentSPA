import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormGroup } from "@angular/forms";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { DataService } from '../services/dataservice.service';
import { Http, HttpModule, Response, Headers, RequestOptions, RequestMethod, XHRBackend, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from "rxjs/Observable";

describe('DataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: 'BASE_URL', useValue: 'http://example.com' },
                DataService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    describe('saveDataByHttpPost()', () => {
        it('should return an Observable<any>',
            inject([DataService, XHRBackend], (dataService: DataService, mockBackend: MockBackend) => {
                const mockResponse = true;
                mockBackend.connections.subscribe((connection: any) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: mockResponse
                    })));
                });
                dataService.saveDataByHttpPost('BASE_URL' + "/xxx", '').subscribe((respoonse: any) => {
                    expect(respoonse._body).toEqual(mockResponse);
                });

            }));
    });
});
