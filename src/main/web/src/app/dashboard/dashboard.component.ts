import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from "@app/user.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

    shouldShowNavigation = false;

    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    constructor(private _breakpointObserver: BreakpointObserver, private _userService: UserService) {
        this._userService.watchLoginStatus()
            .subscribe(isLoggedIn => this.shouldShowNavigation = isLoggedIn.valueOf());
    }


}
