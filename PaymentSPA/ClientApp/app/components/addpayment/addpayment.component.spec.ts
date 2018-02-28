import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormGroup } from "@angular/forms";
import { AddPaymentComponent } from '../addpayment/addpayment.component';
import { IPaymentInfo } from '../../models/payment.model';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { DataService } from '../../services/dataservice.service';
import { Http, HttpModule, Response, Headers, RequestOptions, RequestMethod, XHRBackend, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NotificationsModule, NotificationsService } from 'angular4-notify';
import { Observable } from "rxjs/Observable";

describe('AddPaymentComponent: submit', () => {

    let component: AddPaymentComponent;
    let fixture: ComponentFixture<AddPaymentComponent>;
    let submitEl: DebugElement;
    beforeEach(() => {
        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, HttpModule, RouterTestingModule, NotificationsModule],
            declarations: [AddPaymentComponent],
            providers: [DataService,
                { provide: 'BASE_URL', useValue: 'http://example.com' },
                NotificationsService,
                BaseRequestOptions,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });

        // create component and test fixture
        fixture = TestBed.createComponent(AddPaymentComponent);
        fixture.detectChanges();

        // get test component from the fixture
        component = fixture.componentInstance;
        component.ngOnInit();

        submitEl = fixture.debugElement.query(By.css('btn-primary'));
        //loginEl = fixture.debugElement.query(By.css('input[type=email]'));
        //passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    });

    it('form invalid when empty', () => {
        expect(component.addNewPaymentForm.valid).toBeFalsy();
    });

    it('BSB field validity', () => {
        let errors: any;
        let bsb = component.addNewPaymentForm.controls['bSB'];
        expect(bsb.valid).toBeFalsy();

        // Bsb field is required
        errors = bsb.errors || {};
        expect(errors["required"]).toBeTruthy();

        // Set bsb to something incorrect
        bsb.setValue("123");
        errors = bsb.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeTruthy();

        // Set bsb to something correct
        bsb.setValue("112879");
        errors = bsb.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeFalsy();
    });

    it('Account number field validity', () => {
        let errors: any;
        let accountNo = component.addNewPaymentForm.controls['accountNo'];
        expect(accountNo.valid).toBeFalsy();

        // Account number field is required
        errors = accountNo.errors || {};
        expect(errors["required"]).toBeTruthy();

        // Set Account number to something incorrect
        accountNo.setValue("123");
        errors = accountNo.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeTruthy();

        // Set Account number to something correct
        accountNo.setValue("123456789");
        errors = accountNo.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeFalsy();
    });

    it('Account name field validity', () => {
        let errors: any;
        let accountName = component.addNewPaymentForm.controls['accountName'];
        expect(accountName.valid).toBeFalsy();

        // Account name field is required
        errors = accountName.errors || {};
        expect(errors["required"]).toBeTruthy();

        // Set Account name
        accountName.setValue("Jerry");
        errors = accountName.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('Amount field validity', () => {
        let errors: any;
        let amount = component.addNewPaymentForm.controls['amount'];
        expect(amount.valid).toBeFalsy();

        // amount field is required
        errors = amount.errors || {};
        expect(errors["required"]).toBeTruthy();

        // Set amount 
        amount.setValue(200);
        errors = amount.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('submitting the form with valid form', () => {
        expect(component.addNewPaymentForm.valid).toBeFalsy();
        component.addNewPaymentForm.controls['bSB'].setValue("112879");
        component.addNewPaymentForm.controls['accountNo'].setValue("123456789");
        component.addNewPaymentForm.controls['accountName'].setValue("Jerry");
        component.addNewPaymentForm.controls['reference'].setValue("swimming fee");
        component.addNewPaymentForm.controls['amount'].setValue("100");
        expect(component.addNewPaymentForm.valid).toBeTruthy();
    });

    it('onSubmit() should create a new payment successfully when the form is valid ',

        inject([DataService, XHRBackend], (dataService: DataService, mockBackend: MockBackend) => {
            const mockResponse = true;
            component.onSubmit();//trigger submit button and it will se
            mockBackend.connections.subscribe((connection: any) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: mockResponse
                })));
            });
            dataService.saveDataByHttpPost('BASE_URL' + "/xxx", JSON.stringify(component.addNewPaymentForm.value)).subscribe((respoonse: any) => {
                expect(respoonse._body).toEqual(mockResponse);
                if (respoonse._body) {
                    component.bCreateNewPaymentSuccessfully = respoonse._body;
                }
            });
        }));
});
