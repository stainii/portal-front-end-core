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
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {DashboardComponent} from "@app/dashboard/dashboard.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Ng2Webstorage} from 'ngx-webstorage';
import {LoginComponent} from "@app/login/login.component";
import {FormsModule} from "@angular/forms";
import {LogoutComponent} from './logout/logout.component';
import {AuthenticationHttpInterceptor} from "@app/authentication.interceptor";
import {MenuComponent} from './menu/menu.component';
import {NgProgressModule} from "@ngx-progressbar/core";
import {NgProgressHttpModule} from "@ngx-progressbar/http";


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        LogoutComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        AppRoutingModule,
        LayoutModule,
        FormsModule,
        Ng2Webstorage,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NgProgressModule.forRoot(),
        NgProgressHttpModule.forRoot()
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationHttpInterceptor,
        multi: true
    }, {
        provide: MAT_DATE_LOCALE, useValue: 'nl-BE'
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
