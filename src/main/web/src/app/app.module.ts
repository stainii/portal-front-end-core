import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from '@app/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '@env/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {AppRoutingModule} from "@app/app-routing.module";

import {
    MAT_DATE_LOCALE,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {DashboardComponent} from "@app/dashboard/dashboard.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from 'ngx-webstorage';
import {FormsModule} from "@angular/forms";
import {AuthenticationHttpInterceptor} from "@app/user/authentication.interceptor";
import {MenuComponent} from './menu/menu.component';
import {NgProgressModule} from "@ngx-progressbar/core";
import {NgProgressHttpModule} from "@ngx-progressbar/http";
import {UserModule} from "@app/user/user.module";
import {OfflineInterceptor} from "@app/offline/offline.interceptor";
import {OfflineModule} from "@app/offline/offline.module";
import {ErrorModule} from "@app/error/error.module";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UserModule,
        HttpClientModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        AppRoutingModule,
        LayoutModule,
        FormsModule,
        NgxWebstorageModule.forRoot(),
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        NgProgressModule,
        NgProgressHttpModule,
        OfflineModule,
        ErrorModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationHttpInterceptor,
        multi: true
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: OfflineInterceptor,
        multi: true
    }, {
        provide: MAT_DATE_LOCALE, useValue: 'nl-BE'
    }],
    bootstrap: [AppComponent]
})

export class AppModule {
}
