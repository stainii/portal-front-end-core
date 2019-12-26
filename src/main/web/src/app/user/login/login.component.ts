import {Component} from '@angular/core';
import {UserService} from "@app/user/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    username: string;
    password: string;
    error: string;
    hasError: boolean;

    constructor(private _userService: UserService, private _router: Router) {

    }

    logIn($event: Event) {
        $event.preventDefault();
        this.hasError = false;
        this.error = null;
        this._userService.logIn(this.username, this.password)
            .subscribe(
                () => this._router.navigate(["/notifications"]),
                error => {
                    this.hasError = true;
                    this.error = error.message
                });
    }

}

