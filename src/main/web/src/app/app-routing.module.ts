import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuardService} from "@app/user/authentication-guard.service";
import {LoginComponent} from "@app/user/login/login.component";
import {AuthorisationGuardService} from "@app/user/authorisation-guard.service";
import {DefaultRouteGuardService} from "@app/default-route-guard.service";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }, {
        path: 'notifications',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: 'housagotchi',
        loadChildren: () => import('./housagotchi/housagotchi.module').then(m => m.HousagotchiModule),
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: 'health',
        loadChildren: () => import('./health/health.module').then(m => m.HealthModule),
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: 'setlist',
        loadChildren: () => import('./setlist/setlist.module').then(m => m.SetlistModule),
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: 'social',
        loadChildren: () => import('./social/social.module').then(m => m.SocialModule),
        canActivate: [AuthenticationGuardService, AuthorisationGuardService]
    }, {
        path: "**",
        component: LoginComponent,
        canActivate: [AuthenticationGuardService, AuthorisationGuardService, DefaultRouteGuardService]
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
