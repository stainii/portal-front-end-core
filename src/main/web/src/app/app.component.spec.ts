import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule
} from "@angular/material";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "@app/app-routing.module";
import {LayoutModule} from "@angular/cdk/layout";
import {FormsModule} from "@angular/forms";
import {NgxWebstorageModule} from 'ngx-webstorage';
import {LoginComponent} from "@app/user/login/login.component";
import {LogoutComponent} from "@app/user/logout/logout.component";
import {APP_BASE_HREF} from "@angular/common";
import {MenuComponent} from "@app/menu/menu.component";
import {NgProgressModule} from "@ngx-progressbar/core";


describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatButtonModule,
                MatCardModule,
                MatIconModule,
                MatListModule,
                MatSidenavModule,
                MatToolbarModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientModule,
                AppRoutingModule,
                LayoutModule,
                FormsModule,
                NgxWebstorageModule,
                MatFormFieldModule,
                MatInputModule,
                NgProgressModule,
                NgxWebstorageModule.forRoot(),
            ],
            declarations: [
                AppComponent,
                DashboardComponent,
                LoginComponent,
                LogoutComponent,
                MenuComponent
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
            ]
        }).compileComponents();

    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
