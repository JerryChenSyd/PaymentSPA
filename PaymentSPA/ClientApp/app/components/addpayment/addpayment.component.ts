import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/dataservice.service';
import { IPaymentInfo } from '../../models/payment.model';
import { JL } from 'jsnlog';
import { NotificationsService } from 'angular4-notify'

@Component({
    selector: 'addpayment',
    templateUrl: './addpayment.component.html',
    providers: [DataService, NotificationsService]
})
export class AddPaymentComponent {
    addNewPaymentForm: FormGroup;
    bsbPattern = "^[0-9]{6}$";
    accountNoPattern = "^[0-9]{6,10}$";
    amountPattern = "^[0-9]+(\.[0-9]{1,2})?$";
    bCreateNewPaymentSuccessfully = false;
    messageWhenSubmitInvalidForm = "Please fill the form fields before submit the form!";
    messageWhenCreateNewPaymentSuccessfully = "The payment has been submitted successfully";
    messageWhenCreateNewPaymentUnsuccessfully = "The payment was not submitted successfully!";

    constructor(private route: Router, private fb: FormBuilder, private dataservice: DataService, private notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.addNewPaymentForm = this.fb.group({
            bSB: ['', [Validators.required, Validators.pattern(this.bsbPattern), Validators.min(1)]],
            accountNo: ['', [Validators.required, Validators.pattern(this.accountNoPattern), Validators.min(1)]],
            accountName: ['', Validators.required],
            reference: [''],
            amount: ['', [Validators.required, Validators.pattern(this.amountPattern), Validators.max(100000), Validators.min(0.01)]]
        });
    }

    onSubmit() {
        this.bCreateNewPaymentSuccessfully = false;
        let requestBody = JSON.stringify(this.addNewPaymentForm.value); // Stringify payload
        if (this.addNewPaymentForm.valid) {
            let addNewPaymentServiceUrl = 'api/Payment';
            this.dataservice.saveDataByHttpPost(addNewPaymentServiceUrl, requestBody)
                .subscribe(bSuccess => {
                    this.bCreateNewPaymentSuccessfully = bSuccess;
                    this.showNotificationMessage(this.bCreateNewPaymentSuccessfully);
                    this.addNewPaymentForm.reset();
                });;
        }
        else {
            
            this.notificationsService.addWarning(this.messageWhenSubmitInvalidForm);
        }

        //begin log client-side activities and post to server-side showing in the NLog records.
        let clientLogMessage = "[submit buton clicked with " + (this.addNewPaymentForm.valid ? "valid" : "invalid") + " values: " + requestBody + "]";
        JL().info(clientLogMessage);
    }

    showNotificationMessage(bCreateNewPaymentSuccessfully: boolean) {
        if (bCreateNewPaymentSuccessfully) {
            this.notificationsService.addInfo(this.messageWhenCreateNewPaymentSuccessfully);
        }
        else {
            this.notificationsService.addError(this.messageWhenCreateNewPaymentUnsuccessfully);
        }
    }
}
