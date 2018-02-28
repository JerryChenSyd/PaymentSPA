import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { AddPaymentComponent } from './components/addpayment/addpayment.component';
import { NotificationsModule, NotificationsService } from 'angular4-notify';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        AddPaymentComponent
    ],
    providers: [
        NotificationsService
    ],
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        NotificationsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: AddPaymentComponent },
            { path: 'addpayment', component: AddPaymentComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
