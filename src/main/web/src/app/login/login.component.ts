import {Component} from '@angular/core';
import {UserService} from "@app/user.service";
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

    constructor(private _userService: UserService, private _router: Router) {

    }

    logIn($event: Event) {
        $event.preventDefault();
        this._userService.logIn(this.username, this.password)
            .subscribe(
                () => this._router.navigate(["/notifications"]),
                error => this.error = error.message);
    }

}

