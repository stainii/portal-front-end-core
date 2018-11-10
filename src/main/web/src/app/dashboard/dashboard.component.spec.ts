import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DashboardComponent} from './dashboard.component';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {AppRoutingModule} from "@app/app-routing.module";
import {LayoutModule} from "@angular/cdk/layout";
import {FormsModule} from "@angular/forms";
import {Ng2Webstorage} from 'ngx-webstorage';
import {LoginComponent} from "@app/login/login.component";
import {LogoutComponent} from "@app/logout/logout.component";
import {APP_BASE_HREF} from "@angular/common";
import {MenuComponent} from "@app/menu/menu.component";
import {of} from "rxjs";
import {ModuleService} from "@app/module.service";

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let moduleService;

    beforeEach(fakeAsync(() => {
        moduleService = jasmine.createSpyObj("ModuleService", ["findModulesForLoggedInUser"]);
        TestBed.configureTestingModule({
            imports: [
                MatButtonModule,
                MatCardModule,
                MatIconModule,
                MatListModule,
                MatSidenavModule,
                MatToolbarModule,
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes([]),
                HttpClientModule,
                AppRoutingModule,
                LayoutModule,
                FormsModule,
                Ng2Webstorage,
                MatFormFieldModule,
                MatInputModule
            ],
            declarations: [
                DashboardComponent,
                LoginComponent,
                LogoutComponent,
                MenuComponent
            ], providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: ModuleService, useValue: moduleService}
            ]
        })
            .compileComponents();

        moduleService.findModulesForLoggedInUser.and.returnValue(of([]));
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
