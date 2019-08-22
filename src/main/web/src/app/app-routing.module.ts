import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuardService} from "@app/authentication-guard.service";
import {LoginComponent} from "@app/login/login.component";
import {AuthorisationGuardService} from "@app/authorisation-guard.service";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }, {
        path: 'notifications',
        loadChildren: './notification/notification.module#NotificationModule',
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: 'housagotchi',
        loadChildren: './housagotchi/housagotchi.module#HousagotchiModule',
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: 'todo',
        loadChildren: './todo/todo.module#TodoModule',
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: "**",
        redirectTo: "notifications",
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {

}
