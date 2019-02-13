import {Injectable} from '@angular/core';
import {Module} from "@app/module.model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {UserService} from "@app/user.service";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ModuleService {

    public API_ROOT = environment.apiBaseUrl;
    private cache: Module[];

    constructor(private _http: HttpClient, private _userService: UserService) {
        _userService.watchLoginStatus().subscribe(status => {
            if (!status) {
                this.cache = null;
            }
        })
    }

    findModulesForLoggedInUser(): Observable<Module[]> {
        if (this.cache) {
            return of(this.cache);
        } else {
            return this._http
                .get<Module[]>(this.API_ROOT + "front-end/api/module/")
                .pipe(tap(modules => this.cache = modules));
        }
    }

}
